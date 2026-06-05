const express = require("express");
const authRoutes = require("./routes/authRoutes")
const testRoutes = require("./routes/testRoutes")
const supplierRoutes = require("./routes/supplierRoutes")
const productRoutes = require("./routes/productRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const connectDB = require("./config/db")
const inventoryRoutes = require("./routes/inventoryRoutes");

require("dotenv").config();
connectDB();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes)
app.use("/api", testRoutes)
app.use("/api/inventory", inventoryRoutes);
app.use("/api/suppliers", supplierRoutes)
app.use("/api/products",productRoutes)
app.use("/api/categories",categoryRoutes)

app.get("/", (req, res) => {
  res.send("Backend API running");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});