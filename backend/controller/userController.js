const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const generateNewToken = require("../config/generateToken");

const register = expressAsyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!email || !password) {
    throw new Error("Please Fill All Fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    var token = generateNewToken(newUser._id);
    res.cookie("token", token, { httpOnly: false });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please Fill All Fields");
  }
  const isRegistered = await User.findOne({ email });
  if (!isRegistered) {
    throw { message: `User Not Registered Against ${email}`, status: 404 };
  }

  try {
    if (isRegistered && (await isRegistered.matchPassword(password))) {
      var token = generateNewToken(isRegistered._id);
      res.cookie("token", token, { httpOnly: false });
      res.status(200).json({
        message: "Login Successfully",
        user: {
          name: isRegistered.name,
          email: isRegistered.email,
          phone: isRegistered.phone,
        },
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const Logout = expressAsyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});
module.exports = { register, login,Logout };
