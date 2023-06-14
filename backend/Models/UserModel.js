const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.validate,
      message: "Invalid Email",
    },
  },
  password: { type: String, required: true },
  phone: { type: Number },
});

UserSchema.methods.matchPassword = async function (entered_password) {
  console.log(this.password)
  return await bcrypt.compare(entered_password, this.password);
};

const User = new mongoose.model("User", UserSchema);

module.exports = User;
