const mongoose = require("mongoose");

const inventoryHistorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    type: {
      type: String,
      enum: ["IN", "OUT", "ADJUSTMENT"],
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    previousStock: {
      type: Number,
      required: true
    },
    newStock: {
      type: Number,
      required: true
    },
    reason: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const InventoryHistoryModel = mongoose.model("InventoryHistory", inventoryHistorySchema);   
module.exports = InventoryHistoryModel;

