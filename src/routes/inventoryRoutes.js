const express = require("express");
const router = express.Router();

const {
  stockIn,
  stockOut,
  updateInventory,
  getInventoryHistory,  
  reconcileInventory
} = require("../controllers/inventoryController");

router.post("/stock-in", stockIn);
router.post("/stock-out", stockOut);
router.put("/update", updateInventory);
router.get("/history", getInventoryHistory);
router.post("/reconcile", reconcileInventory);
module.exports = router;