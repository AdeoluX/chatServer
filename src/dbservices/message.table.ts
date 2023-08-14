import { Service } from "typedi";
import { IMessage, Message } from "../models/Message";
import { User } from "../../interfaces/Interfaces";
@Service()
export default class UserRepo {
  createUser = async (data: IMessage_): Promise<IMessage> => {
    const message = await new Message(data).save();
    return message;
  };

  find = async (conditions: IMessage_): Promise<Array<IMessage>> => {
    const message = await Message.find(conditions).sort({ createdAt: 1 });
    return message;
  };

  delete = async (conditions: IMessage_) => {
    const message = await Message.deleteMany(conditions);
  };
}

interface IMessage_ {
  roomId?: string;
  user?: User;
  message?: string;
  createdAt?: Date;
}
