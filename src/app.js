const express = require('express')
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cors({
    origin:"http://localhost:5173",
    credentials : true
}))
app.use(express.json()) // parses incoming requests to JSON payloads and makes the parsed data available in req.body;
app.use(cookieParser()); // enables cookie parsing;


const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')
const userRouter = require('./routes/user')

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter)



connectDB().then(() => {
    console.log("Connected to DataBase Successfully...!");
    app.listen(3000, () => {
        console.log("listening on port 3000")
    });
}).catch((err) =>{
    console.log("cannot connect to DB")
});


