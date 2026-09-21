const mongoose = require("mongoose");

async function connectDB(url) {
    try{
        await mongoose.connect(url);
        console.log("MongoDB connected");
    } catch(error) {
                console.log("MongoDB connection failed:", error);
    }
}

module.exports = connectDB;