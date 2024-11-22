const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      // default: "https://i.postimg.cc/QCBjLdMJ/blank-profile-picture-973460-1280.png",
      require:true
    },
  },
  { timestamps: true } // Correct spelling for timestamps
);

// Create the model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
