import mongoose, { Document, Schema } from 'mongoose';

interface IArchiveMessage extends Document {
    roomId: string;
    chats: string; // A stringified array of chats
    createdAt?: Date;
}
  
const archiveSchema = new Schema<IArchiveMessage>({
    roomId: String,
    chats: String, // Store the chats as a stringified array
    createdAt: { type: Date, default: Date.now },
});

const ArchiveMessage = mongoose.model<IArchiveMessage>('ArchiveMessage', archiveSchema);

export {
    IArchiveMessage, ArchiveMessage
}