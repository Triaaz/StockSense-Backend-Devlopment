const AlertModel = require("../models/Alert");
const ProductModel = require("../models/Product");
const BusinessProfileModel = require("../models/BusinessProfile");

// Check all products for low stock and generate alerts
const checkLowStock = async (req, res) => {
    try {
        const profile = await BusinessProfileModel.findOne();
        const threshold = profile ? profile.lowStockAlert : 10;

        const lowStockProducts = await ProductModel.find({ quantity: { $lte: threshold } });

        const alerts = [];

        for (const product of lowStockProducts) {
            const existingAlert = await AlertModel.findOne({
                product: product._id,
                type: product.quantity === 0 ? "out_of_stock" : "low_stock",
                isRead: false
            });

            if (!existingAlert) {
                const alert = await AlertModel.create({
                    type: product.quantity === 0 ? "out_of_stock" : "low_stock",
                    message: product.quantity === 0
                        ? `${product.name} is out of stock`
                        : `${product.name} is low on stock (${product.quantity} remaining)`,
                    product: product._id,
                    supplier: product.supplier,
                    severity: product.quantity === 0 ? "critical" : "high"
                });
                alerts.push(alert);
            }
        }

        res.status(200).json({
            message: "Low stock check completed",
            alertsGenerated: alerts.length,
            alerts
        });
    } catch (error) {
        return res.status(500).json({ message: "Error checking stock", error: error.message });
    }
};

// Get all alerts
const getAlerts = async (req, res) => {
    try {
        const { isRead } = req.query;
        const filter = {};
        if (isRead !== undefined) {
            filter.isRead = isRead === "true";
        }

        const alerts = await AlertModel.find(filter)
            .populate("product", "name quantity")
            .populate("supplier", "name")
            .sort({ createdAt: -1 });

        res.status(200).json(alerts);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching alerts", error: error.message });
    }
};

// Mark alert as read
const markAsRead = async (req, res) => {
    try {
        const alert = await AlertModel.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        if (!alert) {
            return res.status(404).json({ message: "Alert not found" });
        }

        res.status(200).json({ message: "Alert marked as read", alert });
    } catch (error) {
        return res.status(500).json({ message: "Error updating alert", error: error.message });
    }
};

// Delete an alert
const deleteAlert = async (req, res) => {
    try {
        const alert = await AlertModel.findByIdAndDelete(req.params.id);

        if (!alert) {
            return res.status(404).json({ message: "Alert not found" });
        }

        res.status(200).json({ message: "Alert deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting alert", error: error.message });
    }
};

module.exports = { checkLowStock, getAlerts, markAsRead, deleteAlert };