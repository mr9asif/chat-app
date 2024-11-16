const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const isLogin = async(req, res, next)=>{
     try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).send({message:"user unauthorize"});
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) return res.status(403).send({message:"token not varify"});
        const user = await User.findById(decode.id).select('-password');
        if(!user) return res.status(500).send({message:"user not found"})
      //   console.log(user)
        
       req.user = user;
        next()
     } catch (error) {
      console.log(error)
        res.send(error)
     }
}

module.exports = isLogin;