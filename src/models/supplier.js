const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true
    },
    address: {
        type: String
    },
    contactPerson: {
        type: String
    }
}, { timestamps: true });

const SupplierModel = mongoose.model("Supplier", supplierSchema);
module.exports = SupplierModel;