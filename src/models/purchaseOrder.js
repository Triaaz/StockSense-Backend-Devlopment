const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: [true, "Supplier is required"]
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                min: [1, "Quantity must be at least 1"]
            },
            unitPrice: {
                type: Number,
                required: [true, "Unit price is required"]
            }
        }
    ],
    status: {
        type: String,
        enum: ["pending", "approved", "shipped", "received", "cancelled"],
        default: "pending"
    },
    expectedDeliveryDate: {
        type: Date
    },
    notes: {
        type: String,
        trim: true
    },
    totalCost: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports =
    mongoose.models.PurchaseOrder ||
    mongoose.model("PurchaseOrder", purchaseOrderSchema);