const asyncHandler = require("express-async-handler");
const Hotel = require("../models/hotel");

//@desc GET all hotels
//@route GET/api/hotels
//@access Private
const getAllHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find();
  res.status(200).json(hotels);
});

module.exports = {
  getAllHotels,
};
