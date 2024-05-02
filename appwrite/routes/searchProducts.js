require('dotenv').config();

module.exports = (app, Query, db) => {
    app.get("/search/:search", async (req, res) => {
        
        const search = req.params.search;
        if(search?.length < 3){
            res.status(403).json({
                status: 403,
                message: "Votre recherche doit contenir au minmum 3 caractères pour plus de précision"
            })
        }
        // Paramètres de pagination
        const intPage =  req.query.page ? parseInt(req.query.page) : 1;
        const page = intPage <= 0 ?  1 : intPage;
        const pageSize = 48;
        
        // Calcul de l'offset pour la pagination
        const offset = page * pageSize;
        const queryParams = req.query;
        // data filtrer
        const FilteredData = [];
        //properties
         const properties = Query.select([
                            "id", "image", "href", "sticker", "promotion", "brand",
                            "title", "price", "size", "photos", "logo", "productSizes",
                            "description", "category"
                        ]);
        FilteredData.push(Query.limit(48), Query.offset(offset - 48));
        FilteredData.push(Query.or([Query.contains("title", search),
            Query.contains("brand", search)            
        ]));                
        FilteredData.push(properties);                  


        if (queryParams.brand !== "" && queryParams.brand !== undefined && queryParams.brand !== null) {
            const data = queryParams.brand.split("~");
            FilteredData.push(Query.equal('brand', data));
        } 
        if (queryParams.sizes !== "" && queryParams.sizes !== undefined && queryParams.sizes !== null) {
            const data = queryParams.sizes.split("~");
            FilteredData.push(Query.equal('size', data));
        }
        if (queryParams.sexe !== "" && queryParams.sexe !== undefined && queryParams.sexe !== null) {
            const data = queryParams.sexe.split("~");
            data.map((items) => {
                    if(items === "Femme"){
                        FilteredData.push(Query.contains("title", "Femme"))
                    }
            })
        }

        if (queryParams.colors !== "" && queryParams.colors !== undefined && queryParams.colors !== null) {
            const data = queryParams.colors.split("~");
            let supp = [];
            data.map(items => {
                switch(items){
                    case "Blanc" : { supp.push("White")};
                    break;
                    case "Noir" : { supp.push("Black")};
                    break;
                    case "Argenté" : { supp.push("Silver")};
                    break;
                    case "Bleu" : { supp.push("Blue")};
                    break;
                    case "Gris" : { supp.push("Grey")};
                    break;
                    case "Rose" : { supp.push("Pink")};
                    break;
                    case "Marron" : { supp.push("Brown")};
                    break;
                    default: supp.push(items);
                } 
            })
            FilteredData.push(Query.contains("title", supp));
        }
        if (queryParams.price && queryParams.price !== undefined && queryParams.price !== null) {
            const data = queryParams.price.split("~");
            FilteredData.push(Query.between("price", parseInt(data[0]), parseInt(data[1])))
        }
        if (queryParams.promos !== "" && queryParams.promos !== undefined && queryParams.promos !== null) {
            const data = queryParams.promos.split("~").map(items => parseInt(items));
            FilteredData.push(Query.equal("promotion", data))
        }
        if (queryParams.ecoLabel === "ecoResponsable" && queryParams.ecoLabel !== undefined && queryParams.ecoLabel !== null) {
            FilteredData.push(Query.contains("sticker", "eco-responsable"))
        }
        if (queryParams.sort !== "" && queryParams.sort !== undefined && queryParams.sort !== null) {
            if(queryParams.sort === "1"){
                //`ORDER BY price`  
                FilteredData.push(Query.orderAsc("price"));
            }else if(queryParams.sort === "2"){
                //`ORDER BY price DESC`;   
                FilteredData.push(Query.orderDesc("price"));
            }else if(queryParams.sort === "3"){
                // nouveautes
                FilteredData.push(Query.contains("sticker", "new"))
            } 
        }   
        
       await db.listDocuments(
            process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            FilteredData
        )
        .then(data => {
           if(data.documents.length === 0){
                return res.json({
                    message: "Oops ! Aucun produit ne correspond à votre recherche",
                    total: 0,
                    offset: 0
                })
           }
            const total = data?.total; 
            const message = `Vous avez vu ${offset > total ? total : offset} styles sur ${total}`;
            return res.json({total, offset, message , response: data.documents});
        })
        .catch(error => {
            console.error(error);
            res.status(404).json({
                message: "Un problème est survenu la donnée n'a pas pu etre transmise",
                error
            })
        })

})}