const express = require('express')
const connectDB = require('./config/database');
const app = express()

app.use('/test', (req, res) => {
    console.log("Hello welcome")
})



connectDB().then(() => {
    console.log("Connected to DataBase Successfully...!");
    app.listen(3000, () => {
        console.log("listening on port 3000")
    });
}).catch((err) =>{
    console.log("cannot connect to DB")
});


