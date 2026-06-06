const express = require("express");
const authRoutes = require("./routes/authRoutes")
const testRoutes = require("./routes/testRoutes")
const supplierRoutes = require("./routes/supplierRoutes")
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes")
const productRoutes = require("./routes/productRoutes")
const businessProfileRoutes = require("./routes/businessProfileRoutes")
const alertRoutes = require("./routes/alertRoutes")
const connectDB = require("./config/db")

require("dotenv").config();
connectDB();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes)
app.use("/api", testRoutes)
app.use("/api/suppliers", supplierRoutes)
app.use("/api/purchase-orders", purchaseOrderRoutes)
app.use("/api/products", productRoutes)
app.use("/api/profile", businessProfileRoutes)
app.use("/api/alerts", alertRoutes);

app.get("/", (req, res) => {
  res.send("Backend API running");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});