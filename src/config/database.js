const mongoose = require('mongoose')

const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://shruthireddy1369:shruthireddy1370@cluster0.kfxypap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
}

module.exports = connectDB;