const express = require("express");
const ConnectDb = require("./Db/db");
require("dotenv").config();
const port = process.env.PORT;
const app = express();


app.listen(()=>{
    console.log(`server runnin on ${port}`)
    ConnectDb();
})
