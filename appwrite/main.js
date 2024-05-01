require('dotenv').config();
const express = require("express");
const {Client, Databases, Query} = require('node-appwrite');
const morgan = require("morgan");
const cors = require('cors');
// const fs = require('fs/promises');

const app = express();
const port = 3000;

app
.use(cors({
    origin: 'http://localhost:5173'
}))
.use(express.json())
.use(morgan("dev"))

//init sdk

const client = new Client().setEndpoint(process.env.HOSTNAME)
    .setProject(process.env.PROJECT_ID)
    .setKey(process.env.API_KEY);
const db = new Databases(client, process.env.DATABASE_ID);
//faut pas instancier query


require('./routes/getProducts')(app, Query ,db);
require('./routes/searchProducts')(app, Query, db);
require('./routes/detailProducts')(app, Query, db);

app.get("/", (req, res) => {
        res.json({Home: "Appwrite", reason: "Server", data: "response"})
})
app.use(({res}) => {
    const message = "Impossible de trouver cette ressource. Essayez une autre URL."
    res.status(404).json({message});
})

app.listen(port, () => {
    console.log(`Application ouvert avec succès sur le sport : http://localhost:${port}`)
})
