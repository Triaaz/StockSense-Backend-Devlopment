const Product = require("../models/product");
const InventoryHistory = require("../models/inventoryHistory");

// STOCK IN
const stockIn = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const previousStock = product.currentStock;

    product.currentStock += quantity;

    await product.save();

    await InventoryHistory.create({
      product: productId,
      type: "IN",
      quantity,
      previousStock,
      newStock: product.currentStock,
      reason: "Stock In",
    });

    return res.status(200).json({
      message: "Stock added successfully",
      product,
      previousStock,
      added: quantity,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// STOCK OUT
const stockOut = async (req, res) => {
  try {
    const { productId, quantity, reason } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    // Atomic update prevents race conditions
    const product = await Product.findOneAndUpdate(
      {
        _id: productId,
        currentStock: { $gte: quantity },
      },
      {
        $inc: { currentStock: -quantity },
      },
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(400).json({
        message: "Insufficient stock available or product not found",
      });
    }

    const previousStock = product.currentStock + quantity;

    await InventoryHistory.create({
      product: productId,
      type: "OUT",
      quantity,
      previousStock,
      newStock: product.currentStock,
      reason: reason || "Stock Out",
    });

    return res.status(200).json({
      message: "Stock removed successfully",
      product,
      previousStock,
      removed: quantity,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// INVENTORY ADJUSTMENT
const updateInventory = async (req, res) => {
  try {
    const { productId, newQuantity, reason } = req.body;

    if (!productId || newQuantity === undefined || !reason) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const previousStock = product.currentStock;

    product.currentStock = newQuantity;

    await product.save();

    await InventoryHistory.create({
      product: productId,
      type: "ADJUSTMENT",
      quantity: Math.abs(newQuantity - previousStock),
      previousStock,
      newStock: newQuantity,
      reason,
    });

    return res.status(200).json({
      message: "Inventory updated successfully",
      product,
      previousStock,
      newQuantity,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// INVENTORY RECONCILIATION
const reconcileInventory = async (req, res) => {
  try {
    const { productId, newQuantity, reason } = req.body;

    if (!productId || newQuantity === undefined || !reason) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const previousStock = product.currentStock;

    product.currentStock = newQuantity;

    await product.save();

    await InventoryHistory.create({
      product: productId,
      type: "RECONCILIATION",
      quantity: Math.abs(newQuantity - previousStock),
      previousStock,
      newStock: newQuantity,
      reason,
    });

    return res.status(200).json({
      message: "Inventory reconciled successfully",
      product,
      previousStock,
      newQuantity,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// INVENTORY HISTORY
const getInventoryHistory = async (req, res) => {
  try {
    const history = await InventoryHistory.find()
      .populate("product", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json(history);

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching inventory history",
      error: error.message,
    });
  }
};


module.exports = {
  stockIn,
  stockOut,
  updateInventory,
  reconcileInventory,
  getInventoryHistory,
};