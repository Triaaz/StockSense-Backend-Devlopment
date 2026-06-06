const BusinessProfileModel = require("../models/BusinessProfile");

// Get business profile
const getProfile = async (req, res) => {
    try {
        const profile = await BusinessProfileModel.findOne();
        if (!profile) {
            return res.status(404).json({ message: "Business profile not found. Please create one." });
        }
        res.status(200).json(profile);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
};

// Create or update business profile
const saveProfile = async (req, res) => {
    try {
        const profile = await BusinessProfileModel.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true, runValidators: true }
        );
        res.status(200).json({ message: "Profile saved successfully", profile });
    } catch (error) {
        return res.status(500).json({ message: "Error saving profile", error: error.message });
    }
};

module.exports = { getProfile, saveProfile };