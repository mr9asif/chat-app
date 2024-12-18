import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';
dotenv.config();


const generateToken = (id, res)=>{
    //  console.log(res)
   const token = jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'30d'} )
//    console.log(token)

   if(res){
    res.cookie('jwt',token,{
        maxAge: 30 *24 *60 *60 *1000,
        httpOnly:false,
        sameSite:"strict",
        secure:true
    })
    console.log("Cookie set successfully!");
   }
}

export default generateToken;