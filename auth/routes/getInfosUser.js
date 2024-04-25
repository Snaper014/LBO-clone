require('dotenv').config();
const Users = require('../model/User');
const auth = require('../auth');

module.exports = (app) => {
    app.get("/infos/:id", auth, async (req, res) => {
            const id = req.params.id;
            const existingUser = await Users.findOne({_id: id}); 
        try{
            if(!id){
                res.status(400).json({
                   reason: 'Bad Request',
                   message: 'L\'id n\'existe pas.'
               })
               return;
           }
           if(!existingUser){
               res.status(404).json({
                   reason: 'Utilisateur non trouver',
                   message: 'L\'utilisateur n\'a pas été trouver'
               })
               return;
           }
        const result = {
            lastName: existingUser.lastName,
            firstName: existingUser.firstName, 
            email: existingUser.email, 
            genre: existingUser.genre,
            date_day: existingUser.date_day,
            date_month: existingUser.date_month,
            date_year: existingUser.date_year,
            id: existingUser._id,
            products: existingUser.products
        }
           res.json({data:  result,
           result: "sucess"
        })
        }catch(error){
                console.log(error);
                res.status(500).json({message: "error server"});
            }

    })
}   