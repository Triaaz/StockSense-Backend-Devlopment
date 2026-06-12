const AlertModel = require("../models/Alert");
const ProductModel = require("../models/product");
const BusinessProfileModel = require("../models/BusinessProfile");

// LOW STOCK CHECK
const checkLowStock = async (req, res) => {
  try {
    const profile = await BusinessProfileModel.findOne();
    const threshold = profile?.lowStockAlert ?? 10;

    const lowStockProducts = await ProductModel.find({
      currentStock: { $lte: threshold }
    });

    const alerts = [];

    for (const product of lowStockProducts) {
      const type =
        product.currentStock === 0 ? "out_of_stock" : "low_stock";

      const existing = await AlertModel.findOne({
        product: product._id,
        type,
        isRead: false
      });

      if (!existing) {
        const alert = await AlertModel.create({
          type,
          message:
            type === "out_of_stock"
              ? `${product.name} is out of stock`
              : `${product.name} is low on stock (${product.currentStock} left)`,

          product: product._id,
          supplier: product.supplierLink,
          severity: product.currentStock === 0 ? "critical" : "high"
        });

        alerts.push(alert);
      }
    }

    return res.status(200).json({
      message: "Low stock check completed",
      alertsGenerated: alerts.length,
      alerts
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error checking low stock",
      error: error.message
    });
  }
};

// EXPIRY CHECK
const checkExpiry = async (req, res) => {
  try {
    const daysThreshold = Number(req.query.days || 7);
    const today = new Date();

    const expiryLimit = new Date();
    expiryLimit.setDate(today.getDate() + daysThreshold);

    const products = await ProductModel.find({
      expiryDate: { $lte: expiryLimit, $gte: today }
    });

    const alerts = [];

    for (const product of products) {
      const daysLeft = Math.ceil(
        (new Date(product.expiryDate) - today) / (1000 * 60 * 60 * 24)
      );

      const existing = await AlertModel.findOne({
        product: product._id,
        type: "expiry",
        isRead: false
      });

      if (!existing) {
        const alert = await AlertModel.create({
          type: "expiry",
          message: `${product.name} expires in ${daysLeft} day(s)`,
          product: product._id,
          supplier: product.supplierLink,
          severity: daysLeft <= 3 ? "critical" : "high"
        });

        alerts.push(alert);
      }
    }

    return res.status(200).json({
      message: "Expiry check completed",
      alertsGenerated: alerts.length,
      alerts
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error checking expiry",
      error: error.message
    });
  }
};

// GET ALERTS
const getAlerts = async (req, res) => {
  try {
    const { isRead } = req.query;

    const filter = {};
    if (isRead !== undefined) {
      filter.isRead = isRead === "true";
    }

    const alerts = await AlertModel.find(filter)
      .populate("product", "name currentStock")
      .populate("supplier", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json(alerts);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching alerts",
      error: error.message
    });
  }
};

// MARK ONE AS READ
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

    return res.status(200).json({
      message: "Alert marked as read",
      alert
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating alert",
      error: error.message
    });
  }
};

// DELETE ALERT
const deleteAlert = async (req, res) => {
  try {
    const alert = await AlertModel.findByIdAndDelete(req.params.id);

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    return res.status(200).json({
      message: "Alert deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting alert",
      error: error.message
    });
  }
};

// SUMMARY
const getAlertSummary = async (req, res) => {
  try {
    const totalUnread = await AlertModel.countDocuments({ isRead: false });
    const critical = await AlertModel.countDocuments({
      isRead: false,
      severity: "critical"
    });
    const high = await AlertModel.countDocuments({
      isRead: false,
      severity: "high"
    });

    return res.status(200).json({
      totalUnread,
      critical,
      high
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching summary",
      error: error.message
    });
  }
};

// MARK ALL READ
const markAllAsRead = async (req, res) => {
  try {
    await AlertModel.updateMany(
      { isRead: false },
      { isRead: true }
    );

    return res.status(200).json({
      message: "All alerts marked as read"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating alerts",
      error: error.message
    });
  }
};

module.exports = {
  checkLowStock,
  checkExpiry,
  getAlerts,
  markAsRead,
  deleteAlert,
  getAlertSummary,
  markAllAsRead
};