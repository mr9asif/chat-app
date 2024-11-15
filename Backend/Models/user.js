const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    pic:{type:String, required:true, default:"https://i.postimg.cc/QCBjLdMJ/blank-profile-picture-973460-1280.png"}
}, {timestamp: true})

const user = mongoose.Schema("user", userModel);

mongoose.exports=user;