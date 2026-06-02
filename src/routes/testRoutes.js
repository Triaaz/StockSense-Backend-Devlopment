const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/test",
  protect,
  roleMiddleware("owner", "manager"),
  (req, res) => {
    res.json({ message: "You accessed protected route" });
  }
);

module.exports = router;