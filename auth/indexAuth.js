// Auth MongoDb
// Tester le refresh token
const express = require('express');
const cors = require('cors');
const morgan = require('express');
const connectDB = require('./db/connectDB');

const app = express();
const port = 3500;

app
.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
.use(express.json())
.use(morgan("dev"))

require('./routes/signUp')(app);
require('./routes/signIn')(app);
require('./routes/getInfosUser')(app);
require('./routes/Order')(app);
//delete account

app.get("/", (req, res) => {
       res.json({response: "Home index Auth", status: 200}) 
})

app.use(({res}) => {
    const message = "Impossible de trouver cette ressource. Essayez une autre URL."
    res.status(404).json({message});
})

connectDB()
.then(() => {
    console.log('Connexion à MongoDB');
    app.listen(port, () => console.log(`l'application démarre sur le port ${port} : http://localhost:${port}`));
})
.catch((error) => console.log(`${error} did not connect`));


