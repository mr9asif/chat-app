
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from "express";
import path from 'path';
import ConnectDb from './Db/db.js';
import isLogin from './MiddleWare/Islogin.js';
import { app, server } from './Socket/socket.js';
import { logOut } from './controller/userControllers.js';
import msgRouter from './routes/msgRoutes.js';
import userRoutes from './routes/userRoutes.js';


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

