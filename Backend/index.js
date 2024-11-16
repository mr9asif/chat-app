const express = require("express");
const cors = require('cors');
const ConnectDb = require("./Db/db");
const userRoutes = require('./routes/userRoutes');
const msgRouter = require('./routes/msgRoutes')
const User = require("./Models/user");
const generateToken = require("./congig/jwtToken");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const isLogin = require("./MiddleWare/Islogin");
const port = process.env.PORT;
const app = express();


// middle man
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}))

// api
app.use('/api/user', userRoutes);
app.use("/api/msg", isLogin,msgRouter)




app.listen(port, ()=>{
    console.log(`server runnin on ${port}`)
    ConnectDb();
    generateToken();
    
})

