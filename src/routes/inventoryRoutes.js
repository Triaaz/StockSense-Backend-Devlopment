const express = require("express");
const router = express.Router();

const { stockIn } = require("../controllers/inventoryController");

router.post("/stock-in", stockIn);

module.exports = router;