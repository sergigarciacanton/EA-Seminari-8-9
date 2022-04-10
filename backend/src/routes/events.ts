import express, { Request, Response } from "express";
import { EventModel, Event } from "../models/event.js";
import UserModel, { User } from "../models/User.js";

async function getEvents(req: Request, res: Response): Promise<void> {
  //It returns a void, but internally it's a promise.
  const allEvents = await EventModel.find().populate(
    "usersList",
    "name userName age mail"
  );
  if (allEvents.length == 0) {
    res.status(404).send("There are no events yet!");
  } else {
    res.status(200).send(allEvents);
  }
}

async function getEventByName(req: Request, res: Response): Promise<void> {
  const eventFound = await EventModel.findOne({
    name: req.params.eventName,
  }).populate("usersList", "name userName age mail");
  if (eventFound == null) {
    res.status(404).send("The event doesn't exist!");
  } else {
    res.status(200).send(eventFound);
  }
}

async function createEvent(req: Request, res: Response): Promise<void> {
  console.log(req.body);
  const { name, description, location, category } = req.body;
  const { userName } = req.params;
  const admin: User | null = await UserModel.findOne({
    name: userName,
    disabled: false,
  });
  if (admin == null || admin.name != userName) {
    res.status(404).send({ message: "Error. User not found." });
    return;
  }
  const newEvent = new EventModel({
    name: name,
    description: description,
    location: location,
    admin: admin,
    category: category,
    usersList: admin,
  });
  UserModel.findOneAndUpdate(
    { name: userName, disabled: false },
    { $push: { events: newEvent } },
    function (error, success) {
      if (error) {
        res.status(500).send({ message: "Error adding the event to user." });
        return;
      }
    }
  );
  await newEvent.save();
  res.status(201).send(newEvent);
}

async function joinEvent(req: Request, res: Response): Promise<void> {
  const { userName, eventName } = req.params;
  const user: User | null = await UserModel.findOne({
    name: userName,
    disabled: false,
  });
  if (user == null || user.name != userName) {
    res.status(404).send({ message: "Error. User not found." });
    return;
  }
  const event: Event | null = await EventModel.findOne({ name: eventName });
  if (event == null) {
    res.status(404).send({ message: "Error. Event not found." });
    return;
  }
  UserModel.findOneAndUpdate(
    { name: userName, disabled: false },
    { $push: { events: event } },
    function (error, success) {
      if (error) {
        res.status(500).send({ message: "Error adding the event to user." });
        return;
      }
    }
  );
  EventModel.findOneAndUpdate(
    { name: eventName },
    { $push: { usersList: user } },
    function (error, success) {
      if (error) {
        res.status(500).send({ message: "Error adding the user to event." });
        return;
      }
    }
  );
  res.status(200).send({ message: "Event added successfully to " + user.name });
}

async function leaveEvent(req: Request, res: Response): Promise<void> {
  const { userName, eventName } = req.params;
  const user = await UserModel.findOne({ name: userName, disabled: false });
  if (user == null || user.name != userName) {
    res.status(404).send({ message: "Error. User not found." });
    return;
  }
  const event = await EventModel.findOne({ name: eventName });
  if (event == null) {
    res.status(404).send({ message: "Error. Event not found." });
    return;
  }
  UserModel.findOneAndUpdate(
    { name: userName, disabled: false },
    { $pull: { events: event._id } },
    function (error, success) {
      if (error) {
        res.status(500).send({ message: "Error deleting the event to user." });
        return;
      }
    }
  );
  EventModel.findOneAndUpdate(
    { name: eventName },
    { $pull: { usersList: user._id } },
    function (error, success) {
      if (error) {
        console.log(error);
        res.status(500).send({ message: "Error deleting the user to event." });
        return;
      } else {
        res
          .status(200)
          .send({ message: "Event deleted successfully to " + user.userName });
      }
    }
  );
}

async function updateEvent(req: Request, res: Response): Promise<void> {
  const { eventName } = req.params;
  const eventToUpdate = await EventModel.findOneAndUpdate(
    { name: eventName },
    req.body
  );
  if (eventToUpdate == null) {
    res.status(404).send({ message: "The event doesn't exist!" });
  } else {
    res.status(200).send({ message: "Updated!" });
  }
}

async function deleteEvent(req: Request, res: Response): Promise<void> {
  const { eventName } = req.params;
  const eventToDelete = await EventModel.findOneAndDelete({
    name: eventName,
  });
  if (eventToDelete == null) {
    res.status(404).send("The event doesn't exist!");
  } else {
    UserModel.findOneAndUpdate(
      { _id: eventToDelete.usersList, disabled: false },
      { $pull: { events: eventToDelete._id } },
      { safe: true },
      function (error, success) {
        if (error) {
          res
            .status(500)
            .send({ message: "Error deleting the event to user." });
          return;
        }
      }
    );
    res.status(200).send("Deleted!");
  }
}

let router = express.Router();

router.get("/", getEvents);
router.get("/:eventName", getEventByName);
router.post("/:userName", createEvent);
router.put("/join/:userName/:eventName", joinEvent);
router.put("/leave/:userName/:eventName", leaveEvent);
router.put("/:eventName", updateEvent);
router.delete("/:eventName", deleteEvent);

export default router;
