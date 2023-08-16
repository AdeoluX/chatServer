import mongoose, { Document, Schema } from "mongoose";
import { User } from "../../interfaces/Interfaces";

interface IArchiveMessage extends Document {
  roomId: string;
  chats: string; // A stringified array of chats
  members: Array<User>;
  createdAt?: Date;
}

const archiveSchema = new Schema<IArchiveMessage>({
  roomId: String,
  chats: String, // Store the chats as a stringified array
  members: Array,
  createdAt: { type: Date, default: Date.now },
});

const ArchiveMessage = mongoose.model<IArchiveMessage>(
  "ArchiveMessage",
  archiveSchema
);

export { IArchiveMessage, ArchiveMessage };
