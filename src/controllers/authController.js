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

const sentOtp = async (req, res) => {
    try {
        const { phone } = req.body;
        const user = await UserModel.findOne({ phone });
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();
        console.log(`OTP for ${phone}: ${otp}`);
        return res.status(200).json({ message: "OTP sent successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Error sending OTP", error: error.message })
    }
}

const verifyOtp = async (req, res) => {
    try {
       const {phone, otp} = req.body;
       const user = await UserModel.findOne({ phone }).select("+otp");
       if(!user){
        return res.status(404).json({ message: "User not found" })
       }
       if(String(user.otp) !== String(otp)){
        return res.status(400).json({ message: "Invalid OTP" })
       }
         if(!user.otpExpires || user.otpExpires < Date.now()){
            return res.status(400).json({ message: "OTP expired" })
         }
            user.phoneVerified = true;
            user.otp = undefined;
            user.otpExpires = undefined
            await user.save();
            const token = jwt.sign(
                {id: user._id, role: user.role}, 
                process.env.JWT_SECRET,
                { expiresIn: "24h"}
            );
            return res.status(200).json({ message: "OTP verified successfully", token, user:{
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }})
    } catch (error) {
        return res.status(500).json({ message: "Error verifying OTP", error: error.message })
    }
}

const createPin = async (req, res) => {
    try {
        const { pin} = req.body;
        if (!/^\d{4}$/.test(pin)){
            return res.status(400).json({ message: "PIN must be a 4-digit number" })
        }
        const hashedPin = await bcrypt.hash(pin, 12);
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        if (!user.phoneVerified) {
            return res.status(403).json({ message: "Verify phone number first" })
        }
        user.pin = hashedPin;
        await user.save();
        return res.status(200).json({ message: "PIN created successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Error creating PIN", error: error.message })
    }
}

const loginWithPin = async (req, res) => {
    try {
        const { phone, pin } = req.body;
        const user = await UserModel.findOne({ phone }).select("+pin");
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        if(!user.pin){
            return res.status(400).json({ message: "PIN not set for this user" })
        }
        const isMatch = await bcrypt.compare(pin, user.pin)
        if(!isMatch){
            return res.status(404).json({ message: "Invalid PIN" })
        }
         const token = jwt.sign(
                {id: user._id, role: user.role}, 
                process.env.JWT_SECRET,
                { expiresIn: "24h"}
            );
            return res.status(200).json({ message: "login successful", user:{
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role }
            })
        }catch (error) {
            return res.status(500).json({ message: "Error logging in", error: error.message })
        }
    }


module.exports = {
    register,
    login,
    sentOtp,
    verifyOtp,
    createPin,
    loginWithPin

}