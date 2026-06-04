const express = require("express");
const router = express.Router();

const { 
    createSupplier, 
    getSuppliers, 
    getSupplier, 
    updateSupplier, 
    deleteSupplier 
} = require("../controllers/supplierController");

router.post("/", createSupplier);
router.get("/", getSuppliers);
router.get("/:id", getSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

module.exports = router;