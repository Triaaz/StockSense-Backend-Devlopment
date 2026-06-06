const Product = require("../models/product");
const stockMovementModel = require("../models/stockMovementModel");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      costPrice,
      sellingPrice,
      openingStock,
      reorderLevel,
      unitOfMeasure,
      expiryDate,
      supplierLink,
      sku
    } = req.body;

    const product = await Product.create({
      name,
      description,
      category,
      costPrice,
      sellingPrice,
      openingStock,
      currentStock: openingStock,
      reorderLevel,
      unitOfMeasure,
      expiryDate,
      supplierLink,
      sku
    });

    return res.status(201).json({
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating product",
      error: error.message
    });
  }
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    const { category, lowStock, name } = req.query;

    const filter = {};

    if (category) filter.category = category;

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (lowStock === "true") {
      filter.$expr = {
        $lte: ["$currentStock", "$reorderLevel"]
      };
    }

    const products = await Product.find(filter).populate("category supplierLink");

    return res.status(200).json({
      message: "Products fetched successfully",
      data: products
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching products",
      error: error.message
    });
  }
};

// GET ONE PRODUCT
const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category supplierLink");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching product",
      error: error.message
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating product",
      error: error.message
    });
  }
};

// DELETE PRODUCT (SOFT DELETE)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        deletedAt: new Date(),
        isActive: false
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting product",
      error: error.message
    });
  }
};

// LOW STOCK PRODUCTS
const lowStockProduct = async (req, res) => {
  try {
    const products = await Product.find({
      $expr: {
        $lte: ["$currentStock", "$reorderLevel"]
      }
    });

    return res.status(200).json({
      count: products.length,
      data: products
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching low stock products",
      error: error.message
    });
  }
};

// STOCK HISTORY
const stockHistory = async (req, res) => {
  try {
    const movement = await stockMovementModel.find({
      product: req.params.id
    });

    return res.status(200).json({
      count: movement.length,
      data: movement
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching stock history",
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  lowStockProduct,
  stockHistory
};