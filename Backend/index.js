const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const app = express();


app.listen(()=>{
    console.log(`server runnin on ${port}`)
})
