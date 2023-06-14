const express = require("express");
const {
  createEvent,
  getEvents,
  findEventbyId,
  updateEvent,
  deleteEvent,
} = require("../controller/eventController");
const protector = require("../middleware/protector");
const eventRoutes = express.Router();
const multer = require("multer");
const upload = multer();

eventRoutes.post("/", upload.none(), protector, createEvent);
eventRoutes.get("/", protector, getEvents);
eventRoutes.get("/:id", protector, findEventbyId);
eventRoutes.put("/:id", protector, updateEvent);
eventRoutes.delete("/:id", protector, deleteEvent);

module.exports = eventRoutes;
