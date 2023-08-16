import { Service } from "typedi";
import { ArchiveMessage, IArchiveMessage } from "../models/Archive";
import { User } from "../../interfaces/Interfaces";
@Service()
export default class PropertyRepo {
  ArchiveCreate = async (data: IArchiveMessage_): Promise<IArchiveMessage> => {
    const archive = await new ArchiveMessage(data).save();
    return archive;
  };

  find = async (conditions: any): Promise<Array<IArchiveMessage>> => {
    const archive = await ArchiveMessage.find(conditions);
    return archive;
  };

  update = async (
    updates: IArchiveMessage_,
    conditions: IArchiveMessage_
  ): Promise<IArchiveMessage> => {
    const archive = await ArchiveMessage.findOneAndUpdate(conditions, updates, {
      new: true,
    });
    return archive;
  };
}

interface IArchiveMessage_ {
  roomId?: string;
  chats?: string; // A stringified array of chats
  members?: Array<User>;
  createdAt?: Date;
}
