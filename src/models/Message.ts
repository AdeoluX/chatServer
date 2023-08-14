import mongoose, { Document, Schema } from "mongoose";
import { User, Gender, UserType, Photo } from "../../interfaces/Interfaces";

interface IMessage extends Document {
  roomId: string;
  user: User;
  message: string;
  createdAt?: Date;
}

const messageSchema = new Schema<IMessage>({
  roomId: String,
  user: {
    id: String,
    email: String,
    phoneNumber: String,
    firstname: String,
    middlename: String,
    lastname: String,
    username: String,
    gender: { type: String, enum: Gender },
    dateOfBirth: String, // date
    city: String,
    state: String,
    country: String,
    userType: { type: String, enum: UserType }, // Should be nullable actually
    rating: Number,
    totalRating: Number,
    totalTrips: Number,
    totalTripsCompleted: Number,
    photo: {
      id: String,
      public_id: String,
      url: String,
    },
    createdAt: String, // date
    updatedAt: String, // date
  },
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model<IMessage>("Message", messageSchema);

export { IMessage, Message };
