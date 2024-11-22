import mongoose from "mongoose";

const ConnectDb = async()=>{
    try {
        const db = mongoose.connect(process.env.URI);
        console.log("mongodb connect successfully")

    } catch (error) {
        console.log(error)
    }
}

export default ConnectDb;