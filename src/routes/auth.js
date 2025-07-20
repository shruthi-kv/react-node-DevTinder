const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {validateSignUpData} = require('../utils/validators')

authRouter.post("/signup", async(req,res) =>{
    try{
        validateSignUpData(req)

    let{firstName, lastName, email, password} =  req.body;
    let passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        email,
        password : passwordHash
    })

    await user.save();
    res.send("user data saved successfully");

    }catch(error){
        res.status(400).send("ERROR : " + error.message)
    }
})


module.exports = authRouter;