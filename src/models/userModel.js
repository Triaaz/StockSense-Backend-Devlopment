const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse:true
    },
    phone:{
        type: String,
        unique: true,
        sparse:true
    },
    password: {
        type: String,
        select: false, //hidden by default when fetching user data
    },
    role: {
        type: String,
        enum: ["owner", "manager", "attendant"],
        default:"attendant"
    },
}, { timestamps: true })

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;