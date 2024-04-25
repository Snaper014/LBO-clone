module.exports = (app, db) => {
    app.get("/products/:typeProduct", (req, res) => {
        const name = req.params.typeProduct;
         // Paramètres de pagination
        const intPage =  req.query.page ?  parseInt(req.query.page) : 1;
        const page = intPage <= 0 ?  1 : intPage;
        const pageSize = 48;
    
        // Calcul de l'offset pour la pagination
        const offset = page * pageSize;
        const queryParams = req.query;
        const whereClauses = [];
        const sortData = [];


        if (queryParams.brand !== "" && queryParams.brand !== undefined && queryParams.brand !== null) {
            const data = queryParams.brand.split("~");
            whereClauses.push(`${data.map((items, index) => {
                     if(index + 1 === data?.length){
                        return `brand = ${db.escape(items)}`;
                     }else return `brand = ${db.escape(items)} OR`;       
                    
            }).join(" ")}`);
        }
        if (queryParams.sizes !== "" && queryParams.sizes !== undefined && queryParams.sizes !== null) {
            const data = queryParams.sizes.split("~");
            whereClauses.push(`${data.map((items, index) => {
                    if(index + 1 === data?.length){
                    return `size LIKE '%${items}%'`;
                    }else return `size LIKE '%${items}%' OR`;       
                
            }).join(" ")}`);
        }
        if (queryParams.sexe !== "" && queryParams.sexe !== undefined && queryParams.sexe !== null) {
            const data = queryParams.sexe.split("~");
            whereClauses.push(`${data.map((items, index) => {
                    if(items === "Femme"){
                    return `title LIKE '%${items}%' ${index + 1 === data?.length ? '' : 'OR'}`;
                    }else return `title NOT LIKE '%Femme%' ${index + 1 === data?.length ? '' : 'OR'}`;       
                
            }).join(" ")}`);
        }

        if (queryParams.type !== "" && queryParams.type !== undefined && queryParams.type !== null) {
            const data = queryParams.type.split("~");
            whereClauses.push(`${data.map((items, index) => {
                if(index + 1 === data?.length){
                    return `title LIKE '%${items}%'`;
                    }else return `title LIKE '%${items}%' OR`;        
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
                return `title LIKE '%${items}%' ${supp}`;
                }else return `title LIKE '%${items}%' ${supp} OR`;       
            
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
                    return `promotion = '${parseInt(items)}'`;
                    }else return `promotion  = '${parseInt(items)}' OR`;       
                
            }).join(" ")}`);
        }

        if (queryParams.ecoLabel === "ecoResponsable" && queryParams.ecoLabel !== undefined && queryParams.ecoLabel !== null) {
            whereClauses.push(`sticker LIKE '%eco-responsable%'`);
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
        const queryTotal = `SELECT COUNT(*) FROM ${name} ${whereClause} ${isSorted}`;
       
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
              count += rows.at(0)['COUNT(*)'];
              const fixOffset = (count - (offset - 48)) <= 48 ? (offset - 48) : offset ;
              const query = `SELECT * FROM ${name} ${whereClause} ${isSorted} LIMIT ${pageSize} OFFSET ${fixOffset}`;
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

