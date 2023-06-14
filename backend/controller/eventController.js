const expressAsyncHandler = require("express-async-handler");
const Event = require("../Models/EventModel");

const createEvent = expressAsyncHandler(async (req, res) => {
  const {
    title,
    description,
    location,
    start_time,
    end_time,
    start_date,
    end_date,
  } = req.body;
  if (
    !title ||
    !description ||
    !location ||
    !start_time ||
    !end_time ||
    !start_date ||
    !end_date
  ) {
    throw { message: "Fill All the Fields", status: 422 };
  }

  try {
    const EventDetails = new Event({
      title,
      description,
      location,
      start_time,
      end_time,
      start_date,
      end_date,
      userId: req.user._id,
    });
    const startDateTime = new Date(`${start_date} ${start_time}`);
    const endDateTime = new Date(`${end_date} ${end_time}`);
    const currentDate = new Date().toISOString().split("T")[0];
    const Events = await Event.find({
      EventCreatedAt: currentDate,
      userId: req.user._id,
    });
    if (Events.length < 3) {
      if (endDateTime >= startDateTime && new Date(start_date) >= new Date()) {
        const AddEvent = await EventDetails.save();
        res
          .status(201)
          .json({ message: "Event Created Successfully", event: AddEvent });
      } else {
        throw {
          message:
            "Invalid end time. End time cannot be less than the start time.",
          status: 422,
        };
      }
    } else {
      throw { message: "Your Limit is exceeded", status: 422 };
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const getEvents = expressAsyncHandler(async (req, res) => {
  // const currentDate = new Date().toISOString().split("T")[0];
  try {
    const Events = await Event.find({ userId: req.user._id });
    if (Events) {
      res
        .status(200)
        .json({ message: "Events Retrived Successfully", events: Events });
    } else {
      res.status(200).json({ message: "No Events Found", events: Events });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const findEventbyId = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const findEvent = await Event.findById({ _id: id });
  if (findEvent) {
    res
      .status(200)
      .json({ message: "Event Found Successfully", event: findEvent });
  } else {
    throw { message: "Event Not Found", status: 404 };
  }
});

const updateEvent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const findEvent = await Event.findById({ _id: id });
  if (findEvent.userId.equals(req.user._id)) {
    const startDateTime = new Date(
      `${findEvent.start_date} ${findEvent.start_time}`
    );
    const currentDateTime = new Date();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const timeDifference = startDateTime - currentDateTime;
    const endDateTime = new Date(`${req.body.end_date} ${req.body.end_time}`);
    const currentDate = new Date().toISOString().split("T")[0];
    if (timeDifference >= twentyFourHours) {
      if (endDateTime >= startDateTime && new Date(red.body.start_date) >= new Date()) {
        await Event.findByIdAndUpdate({ _id: id }, req.body, {
          new: true,
        });
        res
          .status(200)
          .json({ message: "Event Updated Successfully", event: findEvent });
      } else {
        throw {
          message:
            "Invalid Date or Time Selection",
          status: 422,
        };
      }
    } else {
      throw {
        message: "You can only modify this event before 24 hours start",
        status: 422,
      };
    }
  } else {
    throw {
      message: "You cannot modify this",
      status: 422,
    };
  }
});

const deleteEvent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const findEvent = await Event.findById({ _id: id });
  if (findEvent.userId.equals(req.user._id)) {
    const startDateTime = new Date(
      `${findEvent.start_date} ${findEvent.start_time}`
    );
    const currentDateTime = new Date();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const timeDifference = startDateTime - currentDateTime;

    if (timeDifference >= twentyFourHours) {
      await Event.findByIdAndDelete({ _id: id });
      res.status(200).json({ message: "Event Deleted Successfully " });
    } else {
      throw {
        message: "You can only Delete this event before 24 hours start",
        status: 422,
      };
    }
  } else {
    throw {
      message: "You cannot Delete this Event",
      status: 422,
    };
  }
});

module.exports = {
  createEvent,
  getEvents,
  findEventbyId,
  updateEvent,
  deleteEvent,
};
