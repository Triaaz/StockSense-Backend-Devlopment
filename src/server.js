const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const productRoutes = require("./routes/productRoutes");
const businessProfileRoutes = require("./routes/businessProfileRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const alertRoutes = require("./routes/alertRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const salesRoutes = require("./routes/salesRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/profile", businessProfileRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/reports", reportRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("Backend API running");
});

// Start server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();