const mongoose = require("mongoose");

const businessProfileSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: [true, "Business name is required"],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String
    },
    logo: {
        type: String
    },
    currency: {
        type: String,
        default: "NGN"
    },
    timezone: {
        type: String,
        default: "Africa/Lagos"
    },
    lowStockAlert: {
        type: Number,
        default: 10
    }
}, { timestamps: true });

const BusinessProfileModel = mongoose.model("BusinessProfile", businessProfileSchema);
module.exports = BusinessProfileModel;