const asyncHandler = require("express-async-handler");
const BookHotel = require("../models/booking");
const User = require("../models/user");

//@desc GET all hotels
//@route GET/api/booked
//@access Private
const getAllBooked = asyncHandler(async (req, res) => {
  const hotels = await BookHotel.find({});
  res.status(200).json(hotels);
});

const getUserBooked = asyncHandler(async (req, res) => {
  const userBooked = await BookHotel.find({ bookedBy: req.user.id });
  res.status(200).json(userBooked);
});

const deleteUserBookings = asyncHandler(async (req, res) => {
  const hotel = await BookHotel.findById(req.params.id);

  if (!hotel) {
    res.status(401);
    throw new Error(`Hotel with ${req.params.id} not found`);
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (hotel.bookedBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error("USer not authorized");
  }

  await BookHotel.findOneAndRemove({ _id: hotel.id, createdBy: user.id });

  res.status(200).json({ id: req.params.id });
});

module.exports = { getAllBooked, getUserBooked, deleteUserBookings };
