const express = require("express");
const router = express.Router();

const {
  stockIn,
  stockOut,
  updateInventory,
  getInventoryHistory
} = require("../controllers/inventoryController");

router.post("/stock-in", stockIn);
router.post("/stock-out", stockOut);
router.put("/update", updateInventory);
router.get("/history", getInventoryHistory);

module.exports = router;