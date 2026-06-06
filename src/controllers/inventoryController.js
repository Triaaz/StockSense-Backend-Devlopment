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

    const previousStock = product.quantity;

    product.quantity += quantity;

    await product.save();

    await InventoryHistory.create({
      product: productId,
      type: "IN",
      quantity,
      previousStock,
      newStock: product.quantity,
      reason: "Stock In"
    });

    return res.status(200).json({
      message: "Stock added successfully",
      product,
      previousStock,
      added: quantity
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

//  STOCK OUT

const stockOut = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock available" });
    }

    const previousStock = product.quantity;

    product.quantity -= quantity;

    await product.save();

    await InventoryHistory.create({
      product: productId,
      type: "OUT",
      quantity,
      previousStock,
      newStock: product.quantity,
      reason: "Stock Out"
    });

    return res.status(200).json({
      message: "Stock removed successfully",
      product,
      previousStock,
      removed: quantity
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// UPDATE INVENTORY 

const updateInventory = async (req, res) => {
  try {
    const { productId, newQuantity, reason } = req.body;

    if (!productId || newQuantity === undefined || !reason) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const previousStock = product.quantity;

    product.quantity = newQuantity;

    await product.save();

    await InventoryHistory.create({
      product: productId,
      type: "ADJUSTMENT",
      quantity: Math.abs(newQuantity - previousStock),
      previousStock,
      newStock: newQuantity,
      reason
    });

    return res.status(200).json({
      message: "Inventory updated successfully",
      product,
      previousStock,
      newQuantity
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

//INVENTORY HISTORY 

const getInventoryHistory = async (req, res) => {
  try {
    const history = await InventoryHistory.find()
      .populate("product", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching inventory history",
      error: error.message
    });
  }
};

module.exports = { stockIn, stockOut, updateInventory, getInventoryHistory };