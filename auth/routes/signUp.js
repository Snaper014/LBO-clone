require('dotenv').config();
const Users = require('../model/User');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.post("/sign-up", async (req, res) => {
        const RegexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/g;
        const RegexEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/g;
        const RegexName = /^[0-9a-zA-Z._%\-\é\è\'\î\ê\Ê\Î].{2,}$/g;

        const {
            genre,
            date_day,
            firstName,
            lastName, 
            date_month,
            date_year,
            email,
            password,
          } = req.body;
          
    try{
           if(firstName.match(RegexName) === null){
              res.status(401).json({
                   reason: 'incorrectFirstNameR' , 
                   message: 'le prénom doit contenir au minimum 2 caratères contenant exclusivement des chiffres et lettres ou (éè._%-)'
                 })
               return;  
            }
        if(lastName.match(RegexName) === null){
            return res.status(401).json({
                  reason: 'incorrectLastNameR' , 
                  message: 'le nom doit contenir au minimum 2 caratères contenant exclusivement des chiffres et lettres ou (éè._%-)'
                })
          }
         if(!RegexEmail.test(email)){
           return res.status(401).json({
                reason: 'emailNoValid',
                message: 'Veuillez saisir une adresse email valide' 
                })
        }   
         if(!RegexPassword.test(password)){
           return res.status(401).json({
                reason: 'incorrectPassword',
                message: "Le mot de passe doit contenir au minimum 8 caratères dont 1 lettre miniscule, 1 lettre majscule et un chiffre."
            })
        }    
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return res.status(400).json({
                reason: "existingUser",
                message: `L\'email : ${email} est déjà existant.`
            })
        }
        const hashedPassword = await bycrpt.hash(password, 12);
        const result = await Users.create({
            lastName: lastName,
            firstName: firstName, 
            email, 
            password: hashedPassword,
            genre,
            date_day,
            date_month,
            date_year
        });

        const token = jwt.sign(
        {
            id: result._id
        },
            process.env.KEY_JWT_TOKEN,
            {expiresIn: '12h'}
            )
         return res.json({result: 'User valider', token}) 
     }catch(error){
         console.log(error);   
         res.status(500).json({message: "Error server"})   
     }
})
}
