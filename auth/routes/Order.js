require('dotenv').config();
const Users = require('../model/User');
const auth = require('../auth');

module.exports = (app) => {
    app.post("/addOrder/:id", auth, async (req, res) => {
            const body = req.body;
            const id = req.params.id;
            // console.log("body", body);
            // console.log("id", id);
            const existingUser = await Users.findOne({_id: id}); 
        try{
            
           if(!existingUser){
               res.status(404).json({
                   reason: 'Utilisateur non trouver',
                   message: 'L\'utilisateur n\'a pas été trouver'
               })
               return;
           }
            existingUser.products.push(body);
            await existingUser.save();
           res.json({result: "success", status: 200});
        
        }catch(error){
                console.log(error);
                res.status(500).json({message: "error server"});
            }

    })
}   