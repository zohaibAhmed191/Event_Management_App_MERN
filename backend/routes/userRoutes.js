const express = require("express");
const userRoutes = express.Router();
const multer = require("multer");
const upload = multer();
const { register, login,Logout } = require("../controller/userController");

userRoutes.post("/register", upload.none(), register);
userRoutes.post("/login", upload.none(), login);
userRoutes.post("/logout", Logout);

module.exports = userRoutes;
