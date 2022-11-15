require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const express = require("express");
const fs = require("fs");

var cors = require("cors");

const app = express();

//connect DB
const connectDB = require("./db");

//route
const usersRoute = require("./routes/usersRoute");
const hotelRoute = require("./routes/hotelsRoute");
const bookedRoute = require("./routes/bookedRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/booked", bookedRoute);

//error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
