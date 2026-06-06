const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    currentStock: {
      type: Number,
      default: 0
    },
    quantity: {
      type: Number,
      default: 0
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);