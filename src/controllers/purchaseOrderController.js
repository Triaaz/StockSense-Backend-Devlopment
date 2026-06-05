const PurchaseOrderModel = require("../models/PurchaseOrder");

// Create a purchase order
const createPurchaseOrder = async (req, res) => {
    try {
        const { supplier, products, expectedDeliveryDate, notes } = req.body;

        // Calculate total cost
        const totalCost = products.reduce((sum, item) => {
            return sum + (item.quantity * item.unitPrice);
        }, 0);

        const purchaseOrder = await PurchaseOrderModel.create({
            supplier,
            products,
            expectedDeliveryDate,
            notes,
            totalCost
        });

        res.status(201).json({ message: "Purchase order created successfully", purchaseOrder });
    } catch (error) {
        return res.status(500).json({ message: "Error creating purchase order", error: error.message });
    }
};

// Get all purchase orders
const getPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrderModel.find()
            .populate("supplier", "name email")
            .populate("products.product", "name price");

        res.status(200).json(purchaseOrders);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching purchase orders", error: error.message });
    }
};

// Get one purchase order by ID
const getPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrderModel.findById(req.params.id)
            .populate("supplier", "name email phone")
            .populate("products.product", "name price");

        if (!purchaseOrder) {
            return res.status(404).json({ message: "Purchase order not found" });
        }

        res.status(200).json(purchaseOrder);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching purchase order", error: error.message });
    }
};

// Update purchase order status
const updatePurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrderModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!purchaseOrder) {
            return res.status(404).json({ message: "Purchase order not found" });
        }

        res.status(200).json({ message: "Purchase order updated successfully", purchaseOrder });
    } catch (error) {
        return res.status(500).json({ message: "Error updating purchase order", error: error.message });
    }
};

// Delete a purchase order
const deletePurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrderModel.findByIdAndDelete(req.params.id);

        if (!purchaseOrder) {
            return res.status(404).json({ message: "Purchase order not found" });
        }

        res.status(200).json({ message: "Purchase order deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting purchase order", error: error.message });
    }
};

module.exports = {
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder
};