const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel")

const protector = expressAsyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      // return res.redirect('/');
      return res.status(401).json({ message: "Unauthenticated" }).redirect('/')
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    // return res.redirect('/');
    return res.status(401).json({ message: "Token is not valid" });
  }
});


module.exports =protector
