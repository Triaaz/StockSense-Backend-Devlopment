const express = require("express");
const router = express.Router();

const {
  recordSale,
  getSalesHistory,
  voidSale,
  dailySalesSummary,
  getAttendantSales
} = require("../controllers/salesController");

router.post("/", recordSale);
router.get("/history", getSalesHistory);
router.patch("/:saleId/void", voidSale);
router.get("/summary/daily", dailySalesSummary);
router.get("/attendant/:attendantId", getAttendantSales);

module.exports = router;