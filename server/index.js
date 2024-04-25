const express = require("express");
const morgan = require("morgan");
const mysql = require('mysql2');
const cors = require('cors');
const reader = require('xlsx');
const file = reader.readFile('../../../scrapping/Vetements.xlsx');


const app = express();
const port = 5000;

app
.use(cors({
    origin: 'http://localhost:5173'
}))
.use(express.json())
.use(morgan("dev"))


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'la_brouette_officielle',
    password: '',
});
  
  db.connect((err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("Vous etes bien connecter à la base de donnée la brouette officielle");
  })

require('./routes/GetProducts')(app, db);
require('./routes/DetailProduct')(app, db);
require('./routes/GetSearch')(app, db);
app.get("/", (req, res) => {
    res.json({Home: "Test", reason: "Server"})
})


//AddAllData();
//AddData();


function AddData(){
    for(let i = 4; i < 5; i++){
             console.log("Ajout de la table à la base de donnée !");
             const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
             const data = temp;
             const values = data.map((items, index) => {
                     const result = `(${index}, '${items?.image}', '${items?.href}', '${items?.sticker}', ${items?.promotion}, '${items?.brand?.replaceAll(/'/g, "''")}', '${items?.title?.replaceAll(/'/g, "''")}', ${items?.price}, '${items?.size}', '${items?.photos}', '${items?.logo}', '${items?.productSizes}', '${items?.description?.replaceAll(/'/g, "''")}', '${items?.descriptionSanitized?.replaceAll(/'/g, "''")}', '${file.SheetNames[i]}')`;
                     return result;    
             }).toString();
             const query = `INSERT INTO ${file.SheetNames[i]} (id, image, href, sticker, promotion, brand, title, price, size, photos, logo, productSizes, description, descriptionSanitized, category) VALUES ${values};`;
             db.execute(query, (err) => {
                 if(err){
                     console.log(err);
                 }else {
                 console.log("Ajout de la donnée dans la table!");
                 }
             })
    } 
}
function AddAllData(){
    for(let i = 10; i < 11; i++){
     const query = `CREATE TABLE ${file.SheetNames[i]} (id INT PRIMARY KEY NOT NULL, image VARCHAR(255), href VARCHAR(255), sticker VARCHAR(255), promotion INT, brand VARCHAR(255), title VARCHAR(255), price INT, size VARCHAR(255), photos VARCHAR(1024), logo VARCHAR(255), productSizes VARCHAR(255), description VARCHAR(3500), descriptionSanitized VARCHAR(3500), category VARCHAR(255))`;
     db.execute(query, (err) => {
            if(err){

                 console.log(err);
         }else {
             console.log("Ajout de la table à la base de donnée !");
             const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
             const data = temp;
             const values = data.map((items, index) => {
                     const result = `(${index}, '${items?.image}', '${items?.href}', '${items?.sticker}', ${items?.promotion}, '${items?.brand?.replaceAll(/'/g, "''")}', '${items?.title?.replaceAll(/'/g, "''")}', ${items?.price}, '${items?.size}', '${items?.photos}', '${items?.logo}', '${items?.productSizes}', '${items?.description?.replaceAll(/'/g, "''")}', '${items?.descriptionSanitized?.replaceAll(/'/g, "''")}', '${file.SheetNames[i]}')`;
                     return result;    
             }).toString();
             const query = `INSERT INTO ${file.SheetNames[i]} (id, image, href, sticker, promotion, brand, title, price, size, photos, logo, productSizes, description, descriptionSanitized, category) VALUES ${values};`;
             db.execute(query, (err) => {
                 if(err){
                     console.log(err);
                 }else {
                 console.log("Ajout de la donnée dans la table!");
                 }
             })
         }
     })

    } 
}


app.use(({res}) => {
    const message = "Impossible de trouver cette ressource. Essayez une autre URL."
    res.status(404).json({message});
})

app.listen(port, () => {
    console.log(`Application ouvert avec succès sur le sport : http://localhost:${port}`)
})



