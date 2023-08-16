import httpStatus from "http-status";
import { generateToken } from "../utils/tokenManagement";
import { abortIf } from "../utils/responder";
import { Service } from "typedi";
import MessageRepo from "../dbservices/message.table";
import ArchiveRepo from "../dbservices/archive.table";

@Service()
export default class AuthService {
  /**
   *
   */
  constructor(
    private readonly messageRepo: MessageRepo,
    private readonly archiveRepo: ArchiveRepo
  ) {}
  getChats = async (data: any) => {
    const { roomId } = data;
    const messages = await this.messageRepo.find({ roomId });
    return messages;
  };

  archiveChats = async (roomId) => {
    // const roomId: string = roomId;
    try {
      // Find chats from a roomId
      const oldChats = await this.archiveRepo.find({ roomId });

      if (oldChats.length > 0) {
        // Group chats by roomId
        for (const item of oldChats) {
          const roomId = item.roomId;

          // Find all Messages with the roomId
          const members = [];
          const messages = await this.messageRepo.find({ roomId });
          for (let item of messages) {
            const check = members.filter((obj) => obj.id === item.user.id);
            if (check.length < 1) {
              members.push(item.user);
            }
          }
          const chats = JSON.stringify(messages);

          // Update archived chats and delete original messages
          await this.archiveRepo.update({ chats, members }, { roomId });
          await this.messageRepo.delete({ roomId });
        }
      }
      console.log("Chats older than 30 days have been archived and deleted.");
      return { success: true };
    } catch (error) {
      console.error("Failed to archive and delete chats:", error);
    }
  };
}
