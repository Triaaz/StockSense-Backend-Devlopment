const UserModel = require("../models/userModel")

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password");
        res.status(200).json({ message: "Users Fetched successfully", count: users.length, users})
    } catch (error) {
        res.status(500).json({ message: "Error Fetching users", error: error.message});
    }
}

const getUserById = async (req, res) => {
    try {
          const user = await UserModel.findById(req.params.id).select("-password");
          if(!user){
            return res.status(404).json({ message: "User not found" })
          }
            res.status(200).json({ message: "User Fetched successfully", user})
    } catch (error) {
        res.status(500).json({ message: "Error Fetching user", error: error.message});
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const user = await UserModel.findByIdAndUpdate(req.params.id, { name, email, phone }, { new: true, runValidators: true }).select("-password");
        if(!user){
            return res.status(404).json({ message: "User not found" })
          }
          res.status(200).json({ message: "User Updated successfully", user})
    } catch (error) {
       res.status(500).json({ message: "Error Updating user", error: error.message}); 
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User not found" })
          }
            res.status(200).json({ message: "User Deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: "Error Deleting user", error: error.message});
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};