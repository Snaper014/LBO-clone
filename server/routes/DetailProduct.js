module.exports = (app, db) => {
    app.get("/detailproduct/:typeProduct/:id",  (req, res) => {
        const name = req.params.typeProduct;
        const id = req.params.id;
        const query = `SELECT * FROM ${name} WHERE id = '${id}' `;
        
        db.execute(query, (err, rows) => {
            if (err instanceof Error) {
                console.log(err);
                res.status(404).json({
                    message: "Un problème est survenu la donnée n'a pas pu etre transmise",
                    err
                })
                return;
              }
              res.json({data: rows});  
        })
    })
}