const jwt = require("jsonwebtoken");
const User = require('../models/user');

const userAuth = async(req,res,next) =>{
    try{
        const {token} = req.cookies;
        if(!token){
           return res.status(401).send("You are not logged-in. please login")
        }
        const decodedObj = await jwt.verify(token, "DEV@TINDER@2025");
        const {_id} = decodedObj;
        
        const user = await User.findById(_id);

        if(!user){
            throw new Error('User not found')
        }
        req.user = user;
        next()

    }catch(error){
        res.status(400).send('ERROR : ' + error.message)
    }
}

module.exports = { userAuth };