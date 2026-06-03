const mongoose = require("mongoose");

const stockEntrySchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: [true, "Supplier is required"]
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    },
    costPrice: {
        type: Number,
        required: [true, "Cost price is required"]
    },
    notes: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const StockEntryModel = mongoose.model("StockEntry", stockEntrySchema);
module.exports = StockEntryModel;