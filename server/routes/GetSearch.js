const {Tables} = require('../List') 

module.exports = (app, db) => {
    app.get("/search/:search", (req, res) => {
        // Faire une liste plus tard.
        //Refaire Table chemises
     
        const search = req.params.search;
        if(search?.length < 3){
            res.status(403).json({
                status: 403,
                message: "Votre recherche doit contenir au minmum 3 caractères pour plus de précision"
            })
        }
        // Paramètres de pagination
        const intPage =  req.query.page ?  parseInt(req.query.page) : 1;
        const page = intPage <= 0 ?  1 : intPage;
        const pageSize = 48;
    
        // Calcul de l'offset pour la pagination
        const offset = page * pageSize;
        const queryParams = req.query;
        const whereClauses = [];
        const sortData = [];

        const condition = `AND (brand LIKE '%${search}%' OR title LIKE '%${search}%')`;    
        whereClauses.push(`(brand LIKE '%${search}%' OR title LIKE '%${search}%')`);
        if (queryParams.brand !== "" && queryParams.brand !== undefined && queryParams.brand !== null) {
            const data = queryParams.brand.split("~");
            whereClauses.push(`${data.map((items, index) => {
                     if(index + 1 === data?.length){
                        return `brand = ${db.escape(items)} ${condition}`;
                     }else return `brand = ${db.escape(items)} ${condition} OR`;       
                    
            }).join(" ")}`);
        }
        if (queryParams.sizes !== "" && queryParams.sizes !== undefined && queryParams.sizes !== null) {
            const data = queryParams.sizes.split("~");
            whereClauses.push(`${data.map((items, index) => {
                    if(index + 1 === data?.length){
                    return `size LIKE '%${items}%' ${condition}`;
                    }else return `size LIKE '%${items}%' ${condition} OR`;       
                
            }).join(" ")}`);
        }
        if (queryParams.sexe !== "" && queryParams.sexe !== undefined && queryParams.sexe !== null) {
            const data = queryParams.sexe.split("~");
            whereClauses.push(`${data.map((items, index) => {
                    if(items === "Femme"){
                    return `title LIKE '%${items}%' ${condition} ${index + 1 === data?.length ? '' : 'OR'}`;
                    }else return `title NOT LIKE '%Femme%' ${condition} ${index + 1 === data?.length ? '' : 'OR'}`;       
                
            }).join(" ")}`);
        }

        if (queryParams.colors !== "" && queryParams.colors !== undefined && queryParams.colors !== null) {
            const data = queryParams.colors.split("~");
            whereClauses.push(`${data.map((items, index) => {
                let supp ="";
                switch(items){
                    case "Blanc" : { supp += "OR title LIKE '%White%'"};
                    break;
                    case "Noir" : { supp += "OR title LIKE '%Black%'"};
                    break;
                    case "Argenté" : { supp += "OR title LIKE '%Silver%'"};
                    break;
                    case "Bleu" : { supp += "OR title LIKE '%Blue%'"};
                    break;
                    case "Gris" : { supp += "OR title LIKE '%Grey%'"};
                    break;
                    case "Rose" : { supp += "OR title LIKE '%Pink%'"};
                    break;
                    case "Marron" : { supp += "OR title LIKE '%Brown%'"};
                    break;
                    default: supp;
                }
                console.log("supp", supp);
                if(index + 1 === data?.length){
                return `(title LIKE '%${items}%' ${supp}) ${condition}`;
                }else return `(title LIKE '%${items}%' ${supp}) ${condition} OR`;       
            
            }).join(" ")}`);
        }

        if (queryParams.price && queryParams.price !== undefined && queryParams.price !== null) {
            const data = queryParams.price.split("~");
            const result = `price BETWEEN ${parseInt(data[0])} AND ${parseInt(data[1])}`;
            whereClauses.push(result);
        }
        if (queryParams.promos !== "" && queryParams.promos !== undefined && queryParams.promos !== null) {
            const data = queryParams.promos.split("~");
            whereClauses.push(`${data.map((items, index) => {
                    if(index + 1 === data?.length){
                    return `promotion = '${parseInt(items)}' ${condition}`;
                    }else return `promotion  = '${parseInt(items)}' ${condition} OR`;       
                
            }).join(" ")}`);
        }

        if (queryParams.ecoLabel === "ecoResponsable" && queryParams.ecoLabel !== undefined && queryParams.ecoLabel !== null) {
            whereClauses.push(`sticker LIKE '%eco-responsable%' ${condition}`);
        }
        if (queryParams.sort !== "" && queryParams.sort !== undefined && queryParams.sort !== null) {
            if(queryParams.sort === "1"){
                sortData.push(`ORDER BY price`);  
            }else if(queryParams.sort === "2"){
                sortData.push(`ORDER BY price DESC`);   
            }else if(queryParams.sort === "3"){
                whereClauses.push(`sticker LIKE '%new%'`);
            } 
        }

        const isSorted = sortData.length > 0 ? sortData[0]: ''; 
        const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : '';
        const allTable = (whereClause) => {
            const result = `${Tables.map((items) => `SELECT * FROM ${items?.link} ${whereClause}`).join(" UNION ")}`
            return result;
        }

        const queryTotal = `${allTable(whereClause)}`;

        db.execute(queryTotal, (err, rows) => {
            let count = 0;
            if (err instanceof Error) {
                console.log(err);
                res.status(404).json({
                    message: "Un problème est survenu la donnée n'a pas pu etre transmise",
                    err
                })
                return;
              }  
              count += rows?.length;
              console.log("count", rows?.length);
              const fixOffset = (count - (offset - 48)) <= 48 ? (offset - 48) : offset ;
              const query = `${allTable(whereClause)} ${isSorted} LIMIT ${pageSize} OFFSET ${fixOffset}`;
              db.execute(query, (err, rows) => { 
                  if (err instanceof Error) {
                      console.log(err);
                      return res.status(404).json({
                        message: "Un problème est survenu la donnée n'a pas pu etre transmise",
                        err
                    });
                    }
                    if(offset > count && (rows.length === 0)){
                        const message = "Oops ! Aucun produit ne correspond à votre recherche";
                        return res.json({length: count, message, data: rows});
                    }
                    const message = `Vous avez vu ${offset > count ? count : offset} styles sur ${count}`;
                    return res.json({length: count, offset, message, data: rows});  
              })
          })


    })

}