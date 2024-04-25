require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = async () => {
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
        try{
            await mongoose.connect(process.env.DATABASE_URL, clientOptions);
        }catch (err){
            console.log("Error Connexion MongoDB", err);
        }
}

module.exports = connectDb;