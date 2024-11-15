const express = require("express");
const cors = require('cors');
const ConnectDb = require("./Db/db");
const userRoutes = require('./routes/userRoutes');
const User = require("./Models/user");
const generateToken = require("./congig/jwtToken");
require("dotenv").config();
const port = process.env.PORT;
const app = express();


// middle man
app.use(express.json());
app.use(cors({
    option:'http://localhost:5173',
}))

// api
app.use('/api/user', userRoutes);

app.get('/', (req, res)=>{
    res.send({messsage:"work"});
    console.log("working")
})


app.listen(port, ()=>{
    console.log(`server runnin on ${port}`)
    ConnectDb();
   
})

