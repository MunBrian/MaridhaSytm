const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//@desc Register new user
//@router POST/api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phonenumber, password } = req.body;

  //check if user already exists
  const userExists = await User.findOne({
    phonenumber: phonenumber,
    email: email,
  });

  console.log(userExists);

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    phonenumber,
    password: hashedPassword,
    isAdmin: false,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phonenumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data. Try again");
  }
});

//@desc Authenticate user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Please enter a valid email and password");
  }
});

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });
};

module.exports = {
  registerUser,
  loginUser,
};
