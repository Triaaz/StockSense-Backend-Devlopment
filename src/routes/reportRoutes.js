const express = require("express");
const router = express.Router();
const { getSummary, getLowStock, getOrderStatus, getRecentOrders, getSupplierPerformance } = require("../controllers/reportController");

router.get("/summary", getSummary);
router.get("/low-stock", getLowStock);
router.get("/order-status", getOrderStatus);
router.get("/recent-orders", getRecentOrders);
router.get("/supplier-performance", getSupplierPerformance);

module.exports = router;