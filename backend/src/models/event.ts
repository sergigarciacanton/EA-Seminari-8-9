import mongoose, { Document } from "mongoose";
import { User } from "./User";
const Schema = mongoose.Schema;

export interface Event extends Document {
  name: String;
  description: String;
  location: {
    type: {
      latitude: Number;
      longitude: Number;
    };
  };
  admin: User;
  eventDate: Date;
  usersList: User[];
  category: String[];
}

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: {
      type: {
        latitude: Number,
        longitude: Number,
      },
    },
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventDate: { type: Date },
    usersList: [{ type: Schema.Types.ObjectId, ref: "User" }],
    category: [{ type: String, required: true }],
  },
  { timestamps: true }
);
export const EventModel = mongoose.model("Event", eventSchema);
