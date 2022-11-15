const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    maxcount: {
      type: Number,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    rentperday: {
      type: Number,
      required: true,
    },
    imageurls: [],
    currentbooking: {
      type: Boolean,
      default: false,
    },
    fromDate: {
      type: String,
      required: true,
    },
    toDate: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
