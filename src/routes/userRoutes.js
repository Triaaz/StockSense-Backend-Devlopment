const express = require("express");
const router = express.Router();

const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/get-users", protect, roleMiddleware("owner", "manager"), getAllUsers);
router.get("/:id", protect, roleMiddleware("owner", "manager"), getUserById);
router.put("/update-user/:id", protect, roleMiddleware("owner", "manager"), updateUser);
router.delete("/delete-user/:id", protect, roleMiddleware("owner", "manager"), deleteUser);

module.exports = router;