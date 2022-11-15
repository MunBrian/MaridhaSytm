const asyncHandler = require("express-async-handler");
const BookHotel = require("../models/booking");

//@desc GET all hotels
//@route GET/api/hotels
//@access Private
const getAllBooked = asyncHandler(async (req, res) => {
  const hotels = await BookHotel.find({});
  res.status(200).json(hotels);
});

module.exports = { getAllBooked };
