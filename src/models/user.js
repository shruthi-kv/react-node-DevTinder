const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required: true,
        },
        lastName :{
            type : String,
            required: true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required: true,
        },
        age:{
            type:Number
        },
        gender:{
            type:String,
        },
        about:{
            type:String,
            default:"Hey, I'm new to devTinder"
        },
        skills:{
            type:[String],
        }
    },{
        timestamps: true
    }
)

userSchema.index({firstName: 1,lastName:1})

const User = mongoose.model('User', userSchema)
module.exports = User;