const Sale = require("../models/saleModel");
const SaleItem = require("../models/saleItemModel");
const Product = require("../models/product");

const recordSale = async (req, res) => {
  try {
    const { attendantId, items } = req.body;

    if (!attendantId || !items || items.length === 0) {
      return res.status(400).json({
        message: "Attendant and items are required"
      });
    }

    let totalAmount = 0;

    // First validate stock
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      if (product.currentStock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`
        });
      }

      if (item.quantity <= 0) {
        return res.status(400).json({
          message: "Quantity must be greater than zero"
        });
    }

      totalAmount += product.sellingPrice * item.quantity;
    }

    const sale = await Sale.create({
      attendant: attendantId,
      totalAmount
    });

    // Create sale items and deduct stock
    for (const item of items) {
      const product = await Product.findById(item.productId);

      const subtotal =
        product.sellingPrice * item.quantity;

      await SaleItem.create({
        sale: sale._id,
        product: product._id,
        quantity: item.quantity,
        unitPrice: product.sellingPrice,
        subtotal
      });

      product.currentStock -= item.quantity;

      await product.save();
    }

    return res.status(201).json({
      message: "Sale recorded successfully",
      sale,
      totalAmount
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

//  GET SALES HISTORY
const getSalesHistory = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("attendant", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: sales.length,
      sales
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// VOID SALE
const voidSale = async (req, res) => {
  try {
    const { saleId } = req.params;

    const sale = await Sale.findById(saleId);

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found"
      });
    }

    if (sale.status === "void") {
      return res.status(400).json({
        message: "Sale already voided"
      });
    }

    sale.status = "void";

    await sale.save();

    return res.status(200).json({
      message: "Sale voided successfully",
      sale
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// DAILY SALES SUMMARY
const dailySalesSummary = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const sales = await Sale.find({
      status: "completed",
      createdAt: {
        $gte: today
      }
    });

    const totalSales = sales.reduce(
      (sum, sale) => sum + sale.totalAmount,
      0
    );

    return res.status(200).json({
      totalTransactions: sales.length,
      totalSales
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// PER ATTENDANT SALES VIEW
const getAttendantSales = async (req, res) => {
  try {
    const { attendantId } = req.params;

    const sales = await Sale.find({
      attendant: attendantId
    })
      .populate("attendant", "name email")
      .sort({ createdAt: -1 });

    const totalSales = sales.reduce(
      (sum, sale) => sum + sale.totalAmount,
      0
    );

    return res.status(200).json({
      attendant: sales[0]?.attendant || null,
      totalTransactions: sales.length,
      totalSales,
      sales
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  recordSale,
  getSalesHistory,
  voidSale,
  dailySalesSummary,
  getAttendantSales
};