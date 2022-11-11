const express = require("express");
const router = express.Router();

const { getAllHotels } = require("../controllers/hotelController");

router.route("/").get(getAllHotels);

module.exports = router;
