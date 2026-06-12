const express = require("express");
const cors = require('cors')
require("dotenv").config();

const connectDB = require("./config/db");

// routes
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

connectDB();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.options('*', cors()) 
app.use(express.json());

// core routes
app.use("/api/auth", authRoutes);

app.use("/api", testRoutes);

// modules
app.use("/api/inventory", inventoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/profile", businessProfileRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend API running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});