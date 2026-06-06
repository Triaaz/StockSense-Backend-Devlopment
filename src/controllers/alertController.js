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

// Check for products nearing expiry
const checkExpiry = async (req, res) => {
    try {
        const daysThreshold = req.query.days || 7;
        const today = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(today.getDate() + Number(daysThreshold));

        const products = await ProductModel.find({
            expiryDate: { $lte: expiryDate, $gte: today }
        });

        const alerts = [];

        for (const product of products) {
            const daysLeft = Math.ceil((new Date(product.expiryDate) - today) / (1000 * 60 * 60 * 24));

            const existingAlert = await AlertModel.findOne({
                product: product._id,
                type: "expiry",
                isRead: false
            });

            if (!existingAlert) {
                const alert = await AlertModel.create({
                    type: "expiry",
                    message: `${product.name} expires in ${daysLeft} day(s)`,
                    product: product._id,
                    supplier: product.supplier,
                    severity: daysLeft <= 3 ? "critical" : "high"
                });
                alerts.push(alert);
            }
        }

        res.status(200).json({
            message: "Expiry check completed",
            alertsGenerated: alerts.length,
            alerts
        });
    } catch (error) {
        return res.status(500).json({ message: "Error checking expiry", error: error.message });
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

// Get alert summary (total unread)
const getAlertSummary = async (req, res) => {
    try {
        const totalUnread = await AlertModel.countDocuments({ isRead: false });
        const critical = await AlertModel.countDocuments({ isRead: false, severity: "critical" });
        const high = await AlertModel.countDocuments({ isRead: false, severity: "high" });

        res.status(200).json({
            totalUnread,
            critical,
            high
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching summary", error: error.message });
    }
};

// Mark all alerts as read
const markAllAsRead = async (req, res) => {
    try {
        await AlertModel.updateMany({ isRead: false }, { isRead: true });
        res.status(200).json({ message: "All alerts marked as read" });
    } catch (error) {
        return res.status(500).json({ message: "Error updating alerts", error: error.message });
    }
};

module.exports = { checkLowStock, checkExpiry, getAlerts, markAsRead, deleteAlert, getAlertSummary, markAllAsRead };