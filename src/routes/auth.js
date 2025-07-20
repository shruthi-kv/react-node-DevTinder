const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {validateSignUpData} = require('../utils/validators')
const jwt = require('jsonwebtoken')

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


authRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    try{

        let user = await User.findOne({email:email});
        if(!user){
            throw new Error("Email doesn't exist in the DB")
        }

        let passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch){
            const token = await jwt.sign({_id:user._id }, "DEV@TINDER@2025", {expiresIn:'1d'});
            res.cookie("token", token);

            res.send("User logged in Successfully")
        }else{
            res.status(401).send("Password does not match")
        }

    }catch(error){
        res.status(400).send("ERROR : " + error.message);
    }
})

module.exports = authRouter;