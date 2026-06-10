const mongoose = require("mongoose");
const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.LIVE_URL)
        console.log('Database connected successfully')
    } catch (error) {
        console.error('Database connection failed',error.message)
    }
};
module.exports = connectDB 