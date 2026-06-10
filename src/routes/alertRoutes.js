const express = require("express");
const router = express.Router();
const { checkLowStock, checkExpiry, getAlerts, markAsRead, deleteAlert, getAlertSummary, markAllAsRead } = require("../controllers/alertController");

router.post("/check", checkLowStock);
router.post("/check-expiry", checkExpiry);
router.get("/", getAlerts);
router.get("/summary", getAlertSummary);
router.put("/read-all", markAllAsRead);
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteAlert);

module.exports = router;