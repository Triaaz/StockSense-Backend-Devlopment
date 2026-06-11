const PurchaseOrderModel = require("../models/purchaseOrder");

// CREATE PURCHASE ORDER
const createPurchaseOrder = async (req, res) => {
  try {
    const {
      supplier,
      products,
      expectedDeliveryDate,
      notes
    } = req.body;

    // 1. VALIDATION (CRITICAL)
    if (
      !supplier ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return res.status(400).json({
        message: "supplier and products array are required"
      });
    }

    // 2. VALIDATE PRODUCT STRUCTURE
    for (let item of products) {
      if (!item.product || !item.quantity || !item.unitPrice) {
        return res.status(400).json({
          message: "Each product must have product, quantity, unitPrice"
        });
      }
    }

    // 3. SAFE TOTAL CALCULATION
    const totalCost = products.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);

    // 4. CREATE PURCHASE ORDER
    const purchaseOrder = await PurchaseOrderModel.create({
      supplier,
      products,
      expectedDeliveryDate,
      notes,
      totalCost
    });

    return res.status(201).json({
      message: "Purchase order created successfully",
      purchaseOrder
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error creating purchase order",
      error: error.message
    });
  }
};

// GET ALL PURCHASE ORDERS
const getPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrderModel.find()
      .populate("supplier", "name email")
      .populate("products.product", "name costPrice sellingPrice");

    return res.status(200).json({
      count: purchaseOrders.length,
      data: purchaseOrders
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching purchase orders",
      error: error.message
    });
  }
};

// GET SINGLE PURCHASE ORDER
const getPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrderModel.findById(req.params.id)
      .populate("supplier", "name email phone")
      .populate("products.product", "name costPrice sellingPrice");

    if (!purchaseOrder) {
      return res.status(404).json({
        message: "Purchase order not found"
      });
    }

    return res.status(200).json(purchaseOrder);

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching purchase order",
      error: error.message
    });
  }
};

// UPDATE PURCHASE ORDER
const updatePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!purchaseOrder) {
      return res.status(404).json({
        message: "Purchase order not found"
      });
    }

    return res.status(200).json({
      message: "Purchase order updated successfully",
      purchaseOrder
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating purchase order",
      error: error.message
    });
  }
};

// DELETE PURCHASE ORDER
const deletePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrderModel.findByIdAndDelete(req.params.id);

    if (!purchaseOrder) {
      return res.status(404).json({
        message: "Purchase order not found"
      });
    }

    return res.status(200).json({
      message: "Purchase order deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting purchase order",
      error: error.message
    });
  }
};

module.exports = {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder
};