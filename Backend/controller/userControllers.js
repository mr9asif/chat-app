const asyncHanlder = require('express-async-handler');
const bycrpt =require('bcryptjs');
const User = require("../Models/user");
const generateToken = require('../congig/jwtToken')

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

// all user
const AllUser = asyncHanlder(async (req, res)=>{
    const keyword = req.query.search ? {
        $or:[
            { name: {$regex: req.query.search, $options: "i"}  },
            { email: {$regex: req.query.search, $options: "i"}  }
        ]
    } : {};
    const user = await User.find(keyword);
    res.send(user)
})




module.exports = {registerUser, authUser, AllUser}