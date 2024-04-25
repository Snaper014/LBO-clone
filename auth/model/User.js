const mongoose = require('mongoose');



const basket = new mongoose.Schema({
    id: {type: Number, required: true},
    image: {type: String},
    href: {type: String},
    sticker: {type: String},
    promotion: {type: String},
    brand: {type: String},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    size: {type: String},
    photos: {type: String},
    logo: {type: String},
    category: {type: String, required: true},
    sizeChoice: {type: String},
    quantity: {type: Number, required: true},
});

const userProduct = new mongoose.Schema({
        Nom: {type: String, required: true},
        Prenom: {type: String, required: true},
        adress_facturation: {type: String, required: true},
        adress_livraison: {type: String, required: true},
        city: {type: String, required: true},
        zip_code: {type: String, required: true},
        mail: {type: String, required: true},
        phone: {type: String},
        adress_comp: {type: String},
        data: [basket]
})

const userSchema = new mongoose.Schema({
    lastName: { type: String , required: true},
    firstName: {type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    genre: {type: String, required: true},
    date_day: {type: String, required: true},
    date_month: {type: String, required: true},
    date_year: {type: String, required: true},
    products: [userProduct]
})   

module.exports = mongoose.model("labrouette_user", userSchema);
