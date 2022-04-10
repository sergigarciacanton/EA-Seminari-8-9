import { Schema, model, Document } from "mongoose";

export interface User extends Document {
  name: string;
  age: number;
  password: string;
  creationDate: Date;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  password: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});
export default model("UserModel", UserSchema);
