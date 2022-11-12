const asyncHandler = require("express-async-handler");
const Hotel = require("../models/hotel");
const axios = require("axios");

//@desc GET all hotels
//@route GET/api/hotels
//@access Private
const getAllHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({ currentbooking: false });
  res.status(200).json(hotels);
});

// @desc book a room
// @route post/api/hotels/book
// @access Private
const bookHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  //check if hotel exists
  if (!hotel) {
    res.status(400);
    throw new Error(`hotel with ${req.body.hotel_id} not found`);
  }

  //calculate rent
  const rentperday = hotel.rentperday;

  //get fromdate and todate from req.body
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;

  const bookingDays = parseInt(toDate) - parseInt(fromDate);

  //set totalRent to be paid
  const totalRent = bookingDays * parseInt(rentperday);

  //get user phone number
  const userNumber = req.user.phonenumber;

  const response = await lipaNaMpesaOnline(totalRent, userNumber);

  if (response) {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedHotel) {
      res.status(201).json({
        updatedHotel,
      });
    } else {
      throw new Error("No hotel found. Error occurred");
    }
  }
});

//@desc create a room
//@route post/api/hotels/add
const createHotel = asyncHandler(async (req, res) => {
  const {
    name,
    maxcount,
    phonenumber,
    rentperday,
    imageurls,
    currentbooking,
    fromDate,
    toDate,
    type,
    description,
  } = req.body;

  if (!req.body) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const hotel = await Hotel.create({
    name,
    maxcount,
    phonenumber,
    rentperday,
    imageurls,
    currentbooking,
    fromDate,
    toDate,
    type,
    description,
  });

  if (hotel) {
    res.status(201).json({
      hotel,
    });
  } else {
    throw new Error("Invalid hotel");
  }
});

const mpesaOAuthToken = async () => {
  let consumer_key = process.env.CONSUMER_KEY;
  let consumer_secret = process.env.CONSUMER_SECRET;

  let url = process.env.OAUTH_TOKEN_URL;

  //form a buffer of the consumer key and secret
  let buffer = new Buffer.from(consumer_key + ":" + consumer_secret);
  const token = buffer.toString("base64");

  const config = {
    headers: {
      Authorization: `Basic ${token}`,
    },
  };

  try {
    let { data } = await axios.get(url, config);
    return data["access_token"];
  } catch (err) {
    console.log(err.data || err);
    return null;
  }
};

const lipaNaMpesaOnline = async (totalRent, userNumber) => {
  let token = await mpesaOAuthToken();

  //getting the timestamp
  const date = new Date();

  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  if (!token) {
    console.log("Mpesa access token cannot be null!!!");
    return null;
  }

  let url = process.env.lipa_na_mpesa_url;
  let bs_short_code = process.env.lipa_na_mpesa_shortcode;
  let passkey = process.env.passkey;

  let password = new Buffer.from(
    `${bs_short_code}${passkey}${timestamp}`
  ).toString("base64");
  let transcation_type = "CustomerPayBillOnline";
  let amount = totalRent; //you can enter any amount
  let partyA = 254746344408; //should follow the format:2547xxxxxxxx
  let partyB = bs_short_code;
  let phoneNumber = userNumber; //should follow the format:2547xxxxxxxx
  let callBackUrl = process.env.call_back_url;
  let accountReference = "lipa-na-mpesa-tutorial";
  let transaction_desc = "Testing lipa na mpesa functionality";

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json",
  };

  const body = {
    BusinessShortCode: bs_short_code,
    Password: password,
    Timestamp: timestamp,
    TransactionType: transcation_type,
    Amount: amount,
    PartyA: partyA,
    PartyB: partyB,
    PhoneNumber: phoneNumber,
    CallBackURL: callBackUrl,
    AccountReference: accountReference,
    TransactionDesc: transaction_desc,
  };

  try {
    const { data } = axios
      .post(url, body, { headers: headers })
      .catch(console.log);
    return true;
  } catch (error) {
    console.log(error.data);
  }
};

module.exports = {
  getAllHotels,
  bookHotel,
  createHotel,
};
