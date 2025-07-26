const validator = require('validator');

const validateSignUpData =(req) =>{
    const {firstName, lastName, email, password} = req.body;

    if(!firstName && !lastName){
        throw new Error("Name is not valid")
    }else if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not Strong")
    }
};

const validateEditProfileData = (req) =>{
    const allowedEditFields = ["gender","skills", "firstName", "lastName", "age","about"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field))

    return isEditAllowed
}




module.exports ={validateSignUpData, validateEditProfileData};