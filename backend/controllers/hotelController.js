const asyncHandler = require("express-async-handler");
const Hotel = require("../models/hotel");
const axios = require("axios");
const pdfTemplate = require("../pdfGen");
const pdf = require("html-pdf");
const fs = require("fs");
const sendEmail = require("../email");

//@desc GET all hotels
//@route GET/api/hotels
//@access Private
const getAllHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({});
  res.status(200).json(hotels);
});

// @desc book a room
// @route post/api/hotels/book
// @access Private
const bookHotel = asyncHandler(async (req, res) => {
  //get users details
  const userName = req.user.name;
  const useremail = req.user.email;
  const userNumber = req.user.phonenumber;

  const hotel = await Hotel.findById(req.params.id);

  console.log(req.user.name);

  //check if hotel exists
  if (!hotel) {
    res.status(400);
    throw new Error(`hotel with ${req.body.hotel_id} not found`);
  }

  //get hotel details
  const hotelName = hotel.name;
  const hotelType = hotel.type;

  //calculate rent
  const rentperday = hotel.rentperday;

  //get fromdate and todate from req.body
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;

  const bookingDays = parseInt(toDate) - parseInt(fromDate);

  //set totalRent to be paid
  const totalRent = bookingDays * parseInt(rentperday);

  //catch response from lipa na mpesa
  const response = await lipaNaMpesaOnline(totalRent, userNumber);

  //check response code
  if (response.ResponseCode === "0") {
    //update hotel
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    //check if hotel exist
    if (updatedHotel) {
      res.status(201).json({
        updatedHotel,
      });
    } else {
      throw new Error("No hotel found. Error occurred");
    }
  } else {
    throw new Error("Payment unsuccessfull");
  }

  //generate pdf
  generatePDF(
    userName,
    fromDate,
    toDate,
    totalRent,
    hotelName,
    hotelType,
    useremail,
    sendEmail
  );

  deletePDF();
});

//send email to user
//   sendEmail(useremail);

//   //delete pdf
//   deletePDF();
// });

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

//generate mpesatoken
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

//lipanaMpesa connection
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
    const data = axios
      .post(url, body, { headers: headers })
      .then((response) => {
        return response.data;
      });
    return data;
  } catch (error) {
    console.log(error.data);
  }
};

//generate pdf func
const generatePDF = async (
  userName,
  fromDate,
  toDate,
  totalRent,
  hotelName,
  hotelType,
  useremail,
  sendEmail
) => {
  let response = false;
  try {
    pdf
      .create(
        pdfTemplate(
          userName,
          fromDate,
          toDate,
          totalRent,
          hotelName,
          hotelType
        ),
        {}
      )
      .toFile("./receipt.pdf", (err, res) => {
        if (res) {
          console.log(res);
          sendEmail(useremail);
        } else {
          console.log(err);
        }
      });

    response = true;

    return response;
  } catch (error) {
    console.log(error);
  }
};

const deletePDF = () => {
  //delete pdf file from system
  fs.unlink("./receipt.pdf", function (err) {
    if (err) {
      console.error(err);
    }
    console.log("File has been Deleted");
  });
};

module.exports = {
  getAllHotels,
  bookHotel,
  createHotel,
};
