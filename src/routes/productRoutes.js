const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  lowStockProduct,
  stockHistory
} = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/low-stock", lowStockProduct);

router.get("/:id", getOneProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.get("/:id/history", stockHistory);

module.exports = router;