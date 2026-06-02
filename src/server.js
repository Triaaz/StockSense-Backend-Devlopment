const express = require("express");
const authRoutes = require("./routes/authRoutes")
const testRoutes = require("./routes/testRoutes")
const connectDB = require("./config/db")

require("dotenv").config();
connectDB();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes)
app.use("/api", testRoutes)
app.get("/", (req, res) => {
  res.send("Backend API running");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});