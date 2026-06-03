const SupplierModel = require("../models/Supplier");

// Create a supplier
const createSupplier = async (req, res) => {
    try {
        const { name, email, phone, address, contactPerson } = req.body;

        const existingSupplier = await SupplierModel.findOne({ email });
        if (existingSupplier) {
            return res.status(400).json({ message: "Supplier already exists" });
        }

        const supplier = await SupplierModel.create({
            name,
            email,
            phone,
            address,
            contactPerson
        });

        res.status(201).json({ message: "Supplier created successfully", supplier });
    } catch (error) {
        return res.status(500).json({ message: "Error creating supplier", error: error.message });
    }
};

// Get all suppliers
const getSuppliers = async (req, res) => {
    try {
        const suppliers = await SupplierModel.find();
        res.status(200).json(suppliers);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching suppliers", error: error.message });
    }
};

// Get one supplier by ID
const getSupplier = async (req, res) => {
    try {
        const supplier = await SupplierModel.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json(supplier);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching supplier", error: error.message });
    }
};

// Update a supplier
const updateSupplier = async (req, res) => {
    try {
        const supplier = await SupplierModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json({ message: "Supplier updated successfully", supplier });
    } catch (error) {
        return res.status(500).json({ message: "Error updating supplier", error: error.message });
    }
};

// Delete a supplier
const deleteSupplier = async (req, res) => {
    try {
        const supplier = await SupplierModel.findByIdAndDelete(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting supplier", error: error.message });
    }
};

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplier,
    updateSupplier,
    deleteSupplier
};