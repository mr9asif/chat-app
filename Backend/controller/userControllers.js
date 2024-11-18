const asyncHanlder = require('express-async-handler');
const bycrpt =require('bcryptjs');
const User = require("../Models/user");
const generateToken = require('../congig/jwtToken');
const Conversation = require('../Models/conversasion');

const registerUser= asyncHanlder(async (req, res) =>{
    const {name, email, password, pic}= req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all fields");
        
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(401);
        throw new Error("user already Exist")
    }
    const salt =await bycrpt.genSalt(10);
    const hash =await bycrpt.hash(password, salt);

    const user = await User.create({
        name, email, password:hash, pic
    })
    if(User){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Faild to create user")
    }
})



// login
const authUser = asyncHanlder(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill up all fields!");
    }

    // Find the user by email
    const exist = await User.findOne({ email });
    
    if (exist) {
        // Compare the password
        const isMatch = await bycrpt.compare(password, exist.password);
       
        if (isMatch) {
            // Send user data and token on success
            generateToken(exist._id, res);
            // console.log("res", res)

            res.status(200).json({
                _id: exist._id,
                name: exist.name,
                email: exist.email,
                pic: exist.pic,
            
            });
        } else {
            res.status(401).send({message:"Invalid email or password"}); // Unauthorized
            // throw new Error("Invalid email or password!");
        }
    } else {
        res.status(404); // Not Found
        throw new Error("User does not exist!");
    }
});

// Search user
 const getUserBySearch=async(req,res)=>{
    try {
        const search = req.query.search?.trim() || '';
        if(!search) return res.status(400).send({message:"please give value"})
      
        const currentUserID = req.user._id;
        const user = await User.find({
            $and:[
                {
                    $or:[
                        {name:{$regex:'.*'+search+'.*',$options:'i'}},
                        // {email:{$regex:'.*'+search+'.*',$options:'i'}}
                    ]
                },{
                    _id:{$ne:currentUserID}
                }
            ]
        }).select("-password").select("email")
    
        res.status(200).send(user)
    
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
    }

// current chateers..who log in
const getCurrentChatters = async(req, res)=>{
      try {
        const currentId = req.user._id;
        
        const currentChats = await Conversation.find({
            participants:currentId
          }).sort({updateAt:-1})
        if(!currentChats || currentChats.length === 0) return res.status(201).send([]);
           
        
        const partcipantsIDS = currentChats.reduce((ids,conversation)=>{
            const otherParticipents = conversation.participants.filter(id => id !== currentId);
            return [...ids , ...otherParticipents]
        },[])
       

        const otherParticipentsIDS = partcipantsIDS.filter(id => id.toString() !== currentId.toString());
        const user = await User.find({_id:{$in:otherParticipentsIDS}}).select("-password").select("-email");
      
   

        const users = otherParticipentsIDS.map(id => user.find(user => user._id.toString() === id.toString()));

        res.status(200).send(users)

    
      } catch (error) {
        res.send(error)
      }
    
}

// log out
const logOut = (req, res)=>{
     try {
        res.clearCookie("jwt")
    res.send("log out successfully")
     } catch (error) {
        res.send(error)
     }
}


module.exports = {registerUser, authUser, getUserBySearch, getCurrentChatters, logOut}