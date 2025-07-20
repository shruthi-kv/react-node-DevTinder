const express = require('express')
const profileRouter = express.Router()
const {userAuth} = require('../middleware/auth')
const {validateEditProfileData} = require('../utils/validators')

profileRouter.get('/profile/view',userAuth, async(req,res) =>{
    try{
        const user = req.user;
        res.send(user);
    }catch(error){
        res.status(400).send("ERROR : " + error.message)
    }
})

profileRouter.patch('/profile/edit', userAuth, async(req,res) =>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit request")
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.json({
            message:` ${loggedInUser.firstName}, your profile updated successfully!`
        })

    }catch(error){
        res.status(400).send("ERROR : " + error.message)
    }
})



module.exports = profileRouter;