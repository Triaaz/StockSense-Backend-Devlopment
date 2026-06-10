const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

// routes
const authRoutes = require("./routes/authRoutes");
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
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());

// core routes
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

app.get("/", (req, res) => {
  res.send("Backend API running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});