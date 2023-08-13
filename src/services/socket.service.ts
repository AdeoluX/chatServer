import { Service } from "typedi";
import express, { Request, Response } from "express";
import MessageRepo from "../dbservices/message.table";
import ArchiveRepo from "../dbservices/archive.table";

@Service()
export default class SocketService {
  /**
   *
   */
  constructor(
    private readonly messageRepo: MessageRepo,
    private readonly archiveRepo: ArchiveRepo // private readonly userRepo: UserRepo
  ) {}
  archiveChats = async (ws: WebSocket, req: Request) => {
    const roomId: string = req.params.roomId;
    try {
      // Find chats from a roomId
      const oldChats = await this.archiveRepo.find({ roomId });

      if (oldChats.length > 0) {
        // Group chats by roomId
        for (var item of oldChats) {
          const roomId = item.roomId;
          //find all Messages with
          const messages = await this.messageRepo.find({ roomId });
          const chats = JSON.stringify(messages);
          await this.archiveRepo.update({ chats }, { roomId });
          await this.messageRepo.delete({ roomId });
        }
      }
      console.log("Chats older than 30 days have been archived and deleted.");
    } catch (error) {
      console.error("Failed to archive and delete chats:", error);
    }
  };

  socketActivities = async (ws: WebSocket, req: Request, rooms: any) => {
    const roomId: string = req.params.roomId;

    //find archive roomId
    const archive = await this.archiveRepo.find({ roomId });
    if (archive.length < 1) {
      await this.archiveRepo.ArchiveCreate({
        roomId,
      });
    }
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    const room = rooms.get(roomId);
    if (room) {
      room.add(ws);

      ws.onmessage = async (event: MessageEvent) => {
        const msg: any = JSON.parse(event.data);
        // Save the message to the database
        const { sender, message } = msg;
        const newMessage = await this.messageRepo.createUser({
          roomId,
          sender: msg.sender,
          message: msg.message,
        });

        // Broadcast the message to all clients in the room
        for (const client of room) {
          if (client !== ws) {
            client.send(JSON.stringify(msg));
          }
        }
      };

      ws.onclose = () => {
        room.delete(ws);
        if (room.size === 0) {
          rooms.delete(roomId);
        }
      };
    }
  };
}
