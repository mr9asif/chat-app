const express = require("express");
const cors = require('cors');
const ConnectDb = require("./Db/db");
const userRoutes = require('./routes/userRoutes');
const msgRouter = require('./routes/msgRoutes')
const User = require("./Models/user");
const generateToken = require("./congig/jwtToken");
const path = require('path');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const isLogin = require("./MiddleWare/Islogin");
const { logOut } = require("./controller/userControllers");
const { server, app } = require("./Socket/socket");


const port = process.env.PORT || 4001;

const __dirname = path.resolve();

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
app.use("/api/logout", logOut)
app.use('/', isLogin)
app.get('/m', (req, res)=>{
 res.send({message:"hi"})
})
app.use(express.static(path.join(__dirname,"../Frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(port, ()=>{
    console.log(`server runnin on ${port}`)
    ConnectDb();
    
    
})

