const Joi = require("joi");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
});


const Books = mongoose.model("Book", bookSchema);

module.exports = Books;
