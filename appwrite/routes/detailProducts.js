require('dotenv').config();

module.exports = (app, Query, db) => {
    app.get("/detailproduct/:typeProduct/:id", async (req, res) => {
        const name = req.params.typeProduct;
        const id = req.params.id;
        // data filtrer
        const FilteredData = [];
        //properties
         const properties = Query.select([
                            "id", "image", "href", "sticker", "promotion", "brand",
                            "title", "price", "size", "photos", "logo", "productSizes",
                            "description", "category"
                        ]);
        FilteredData.push(properties);                  
        FilteredData.push(Query.equal("category", name));
        FilteredData.push(Query.equal("id", parseInt(id)));                             
       await db.listDocuments(
            process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            FilteredData
        )
        .then(data => {
            return res.json({status: 200 , response: data.documents});
        })
        .catch(error => {
            console.error(error);
            res.status(404).json({
                message: "Un problème est survenu la donnée n'a pas pu etre transmise",
                error
            })
        })

})}