const mongoose = require("mongoose");


const Event_Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    location: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    EventCreatedAt:{type:String,default: () => {
      const currentDate = new Date().toISOString().split('T')[0];
      return currentDate;
    }},
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", Event_Schema);

module.exports = Event;
