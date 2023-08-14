import { Service } from "typedi";
import express, { Request, Response } from "express";
import MessageRepo from "../dbservices/message.table";
import ArchiveRepo from "../dbservices/archive.table";

@Service()
export default class SocketService {
  /**
   * Initializes the SocketService with repositories.
   * @param messageRepo - The repository for chat messages.
   * @param archiveRepo - The repository for archived chats.
   */
  constructor(
    private readonly messageRepo: MessageRepo,
    private readonly archiveRepo: ArchiveRepo
  ) {}

  /**
   * Archives and deletes chat messages older than 30 days.
   * @param ws - The WebSocket connection.
   * @param req - The HTTP request object.
   */
  archiveChats = async (ws: WebSocket, req: Request) => {
    const roomId: string = req.params.roomId;
    try {
      // Find chats from a roomId
      const oldChats = await this.archiveRepo.find({ roomId });

      if (oldChats.length > 0) {
        // Group chats by roomId
        for (const item of oldChats) {
          const roomId = item.roomId;

          // Find all Messages with the roomId
          const messages = await this.messageRepo.find({ roomId });
          const chats = JSON.stringify(messages);

          // Update archived chats and delete original messages
          await this.archiveRepo.update({ chats }, { roomId });
          await this.messageRepo.delete({ roomId });
        }
      }
      console.log("Chats older than 30 days have been archived and deleted.");
    } catch (error) {
      console.error("Failed to archive and delete chats:", error);
    }
  };

  /**
   * Handles WebSocket activities for a specific room.
   * @param ws - The WebSocket connection.
   * @param req - The HTTP request object.
   * @param rooms - The map of active chat rooms.
   */
  socketActivities = async (ws: WebSocket, req: Request, rooms: any) => {
    try {
      const roomId: string = req.params.roomId;

      // Find archive for the roomId
      const archive = await this.archiveRepo.find({ roomId });

      // If no archive found, create one
      if (archive.length < 1) {
        await this.archiveRepo.ArchiveCreate({
          roomId,
        });
      }

      // Check if the room exists, if not create it
      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }

      const room = rooms.get(roomId);

      if (room) {
        room.add(ws);

        ws.onmessage = async (event: MessageEvent) => {
          try {
            const msg: any = JSON.parse(event.data);
            // Save the message to the database
            const { user, message } = msg;
            const newMessage = await this.messageRepo.createUser({
              roomId,
              user,
              message,
            });

            // Broadcast the message to all clients in the room
            for (const client of room) {
              if (client !== ws) {
                client.send(JSON.stringify(msg));
              }
            }
          } catch (error) {
            console.error(
              "Error while processing and broadcasting message:",
              error
            );

            // Emit an error message to the client
            ws.send(
              JSON.stringify({
                error: "An error occurred while processing your message.",
              })
            );
          }
        };

        ws.onclose = () => {
          room.delete(ws);
          if (room.size === 0) {
            rooms.delete(roomId);
          }
        };
      }
    } catch (error) {
      console.error("Error in socketActivities:", error);

      // Emit an error message to the client
      ws.send(
        JSON.stringify({
          error: "An error occurred while connecting to the room.",
        })
      );
    }
  };
}
