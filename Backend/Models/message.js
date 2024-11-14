const mongoose = require("mongoose");

const Message = mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    content:{type:String, trim:true},
}, {timestamps:true})

const message = mongoose.model("message", Message);

module.exports = message;