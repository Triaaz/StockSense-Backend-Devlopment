const express = require("express");
const router = express.Router();
const { checkLowStock, getAlerts, markAsRead, deleteAlert } = require("../controllers/alertController");

router.post("/check", checkLowStock);
router.get("/", getAlerts);
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteAlert);

module.exports = router;