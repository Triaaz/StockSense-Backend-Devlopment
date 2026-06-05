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

    const previousStock = product.stockQuantity;

    product.stockQuantity += quantity;

    await product.save();

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

module.exports = { stockIn };