import { Service } from 'typedi';
import MessageRepo from '../dbservices/message.table';
import ArchiveRepo from '../dbservices/archive.table'

@Service()
export default class CronService {
  /**
   *
   */
  constructor(
    private readonly messageRepo: MessageRepo,
    private readonly archiveRepo: ArchiveRepo,
  ) {}
  archiveChats = async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
      // Find chats older than 30 days
      const oldChats = await this.archiveRepo.find({ createdAt: { $lt: thirtyDaysAgo } });
  
      if (oldChats.length > 0) {
        // Group chats by roomId
        for (var item of oldChats){
          const roomId = item.roomId
          //find all Messages with
          const messages = await this.messageRepo.find({roomId})
          const chats = JSON.stringify(messages)
          await this.archiveRepo.update({chats}, {roomId})
          await this.messageRepo.delete({roomId})
        }
      }
      console.log('Chats older than 30 days have been archived and deleted.');
    } catch (error) {
      console.error('Failed to archive and delete chats:', error);
    }
  };
}
