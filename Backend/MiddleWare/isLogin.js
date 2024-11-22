import jwt from "jsonwebtoken";
import User from "../Models/user.js";


const isLogin = async(req, res, next)=>{
     try {
        const token = req.cookies.jwt;
        console.log(token)
        if(!token) return res.status(401).send({message:"user unauthorize"});
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) return res.status(403).send({message:"token not varify"});
        const user = await User.findById(decode.id).select('-password');
        if(!user) return res.status(500).send({message:"user not found"})
      //   console.log(user)
        
       req.user = user;
      //  console.log("object")
        next()
     } catch (error) {
      console.log(error)
        res.send(error)
     }
}

export default isLogin;