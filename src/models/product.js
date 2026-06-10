const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    supplierLink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      default: null
    },

    costPrice: {
      type: Number,
      required: true,
      min: 0
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0
    },

    openingStock: {
      type: Number,
      required: true,
      min: 0
    },

    currentStock: {
      type: Number,
      default: 0,
      min: 0
    },

    reorderLevel: {
      type: Number,
      default: 5,
      min: 0
    },

    unitOfMeasure: {
      type: String,
      default: "pcs"
    },

    expiryDate: {
      type: Date
    },

    sku: {
      type: String,
      unique: true,
      sparse: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);