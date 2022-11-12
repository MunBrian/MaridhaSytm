const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getAllHotels,
  bookHotel,
  createHotel,
} = require("../controllers/hotelController");

router.route("/").get(getAllHotels);
router.post("/book/:id", protect, bookHotel);
router.post("/add", createHotel);

module.exports = router;
