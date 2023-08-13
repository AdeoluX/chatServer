import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
    roomId: string;
    sender: string;
    message: string;
    createdAt?: Date;
  }
  
  const messageSchema = new Schema<IMessage>({
    roomId: String,
    sender: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
  });
  
  const Message = mongoose.model<IMessage>('Message', messageSchema);

  export {
    IMessage, Message
  }