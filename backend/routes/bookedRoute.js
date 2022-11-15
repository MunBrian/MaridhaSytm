const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getAllBooked,
  getUserBooked,
  deleteUserBookings,
} = require("../controllers/bookedContoller");

router.route("/").get(getAllBooked);
router.route("/userbooked").get(protect, getUserBooked);
router.route("/userbooked/:id").delete(protect, deleteUserBookings);

module.exports = router;
