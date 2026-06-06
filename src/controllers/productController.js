const ProductModel = require("../models/Product");

const createProduct = async (req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        return res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().populate("supplier", "name");
        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

module.exports = { createProduct, getProducts };