const express = require("express");
const router = express.Router();

const { stockIn, stockOut } = require("../controllers/inventoryController");

router.post("/stock-in", stockIn);
router.post("/stock-out", stockOut);

module.exports = router;