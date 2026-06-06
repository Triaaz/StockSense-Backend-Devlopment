const Product = require("../models/product");

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

    const previousQuantity = product.Quantity;

    product.Quantity += quantity;

    await product.save();

    return res.status(200).json({
      message: "Stock added successfully",
      product,
      previousQuantity,
      added: quantity
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// STOCK OUT
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

    // Prevent Negative Stock

    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock available"});
    }

    const previousQuantity = product.quantity;

    product.quantity -= quantity;

    await product.save();

    return res.status(200).json({
      message: "Stock removed successfully",
      product,
      previousQuantity,
      removed: quantity
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = { stockIn, stockOut };
