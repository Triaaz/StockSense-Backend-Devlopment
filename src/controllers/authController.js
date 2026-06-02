const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel")

const register = async ( req, res) => {
    try {
        const { name, email, phone, password, role} = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await UserModel.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role
        })
        res.status(201).json({ message: "User registered successfully", user:{
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        }})
    } catch (error) {
        return res.status(500).json({ message: "Error registering user", error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
         const user = await UserModel.findOne({ email }).select("+password");
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(404).json({ message: "Invalid password" })
        }
        const token = jwt.sign(
            {id: user._id, role: user.role}, 
            process.env.JWT_SECRET,
            { expiresIn: "24h"}
        );
        return res.status(200).json({ message: "Login successful", token, user:{
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }})
    } catch (error) {
        return res.status(500).json({ message: "Error logging in user", error: error.message })
    }
}

module.exports = {
    register,
    login
}