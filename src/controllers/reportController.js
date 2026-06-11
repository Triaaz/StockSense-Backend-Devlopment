const SupplierModel = require("../models/supplier");
const ProductModel = require("../models/product");
const PurchaseOrderModel = require("../models/PurchaseOrder");
const AlertModel = require("../models/Alert");

// Dashboard summary
const getSummary = async (req, res) => {
    try {
        const totalSuppliers = await SupplierModel.countDocuments();
        const totalProducts = await ProductModel.countDocuments();
        const totalOrders = await PurchaseOrderModel.countDocuments();
        const unreadAlerts = await AlertModel.countDocuments({ isRead: false });
        const lowStockProducts = await ProductModel.countDocuments({ quantity: { $lte: 10 } });

        res.status(200).json({
            totalSuppliers,
            totalProducts,
            totalOrders,
            unreadAlerts,
            lowStockProducts
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching summary", error: error.message });
    }
};

// Low stock products
const getLowStock = async (req, res) => {
    try {
        const products = await ProductModel.find({ quantity: { $lte: 10 } })
            .populate("supplier", "name")
            .sort({ quantity: 1 });

        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching low stock", error: error.message });
    }
};

// Order breakdown by status
const getOrderStatus = async (req, res) => {
    try {
        const pending = await PurchaseOrderModel.countDocuments({ status: "pending" });
        const approved = await PurchaseOrderModel.countDocuments({ status: "approved" });
        const shipped = await PurchaseOrderModel.countDocuments({ status: "shipped" });
        const received = await PurchaseOrderModel.countDocuments({ status: "received" });
        const cancelled = await PurchaseOrderModel.countDocuments({ status: "cancelled" });

        res.status(200).json({ pending, approved, shipped, received, cancelled });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching order status", error: error.message });
    }
};

// Recent orders
const getRecentOrders = async (req, res) => {
    try {
        const orders = await PurchaseOrderModel.find()
            .populate("supplier", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching recent orders", error: error.message });
    }
};

// Supplier performance (orders per supplier)
const getSupplierPerformance = async (req, res) => {
    try {
        const performance = await PurchaseOrderModel.aggregate([
            {
                $group: {
                    _id: "$supplier",
                    totalOrders: { $sum: 1 },
                    totalSpent: { $sum: "$totalCost" }
                }
            },
            {
                $lookup: {
                    from: "suppliers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "supplier"
                }
            },
            { $unwind: "$supplier" },
            {
                $project: {
                    _id: 0,
                    supplier: "$supplier.name",
                    totalOrders: 1,
                    totalSpent: 1
                }
            },
            { $sort: { totalOrders: -1 } }
        ]);

        res.status(200).json(performance);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching supplier performance", error: error.message });
    }
};

module.exports = { getSummary, getLowStock, getOrderStatus, getRecentOrders, getSupplierPerformance };