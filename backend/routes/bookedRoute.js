const express = require("express");
const router = express.Router();

const { getAllBooked } = require("../controllers/bookedContoller");

router.route("/").get(getAllBooked);

module.exports = router;
