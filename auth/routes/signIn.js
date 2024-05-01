require('dotenv').config();
const Users = require('../model/User');
const jwt = require('jsonwebtoken');
const bycrpt = require('bcryptjs');

module.exports = (app) => {
    app.post("/sign-in", async (req, res) => {
        const {email, password} = req.body;
        let existingUser = await Users.findOne({email});

    try{
           if(!existingUser){
                res.status(404).json({
                   reason: "incorrectEmailLogin",
                   message: "l'email n'existe pas"
               })
              return; 
           }
        bycrpt.compare(password, existingUser.password)
        .then(response => {
            const isPasswordCorrect = response;
            if(!isPasswordCorrect){
               return res.status(400).json({
                    reason: 'incorrectPasswordLogin',
                    message: "le mot de passe indiquer n'est pas le bon, Veuillez Réessayez."
                })
                
            }
            const token = jwt.sign(
                {
                    id: existingUser._id
            },
                process.env.KEY_JWT_TOKEN,
                {expiresIn: '12h'}
                )
           return res.json({result: 'User valider', token}); 
        })
        .catch(error => console.log("error", error))
        
        }catch(error){
            res.status(500).json({message: "Error server"})  
        }
})
}