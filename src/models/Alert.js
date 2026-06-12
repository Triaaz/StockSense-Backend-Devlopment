const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["low_stock", "out_of_stock", "expiry", "custom"],
      required: true
    },

    message: {
      type: String,
      required: true
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      default: null
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low"
    },

    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const AlertModel = mongoose.model("Alert", alertSchema);

module.exports = AlertModel;