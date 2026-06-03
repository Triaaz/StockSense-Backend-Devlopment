const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Supplier name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        match: [/^\d{10,15}$/, "Please enter a valid phone number"]
    },
    address: {
        type: String,
        trim: true
    },
    contactPerson: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const SupplierModel = mongoose.model("Supplier", supplierSchema);
module.exports = SupplierModel;