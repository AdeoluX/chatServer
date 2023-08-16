// const catchAsync = require('../utils/catchAsync');
import { catchAsync } from "../utils/catchAsync";
import ChatService from "../services/chat.service";
import {
  successResponse,
  abortIf,
  errorResponse,
  download,
  downloadFile,
} from "../utils/responder";
import { Service } from "typedi";
// import console from 'console';

@Service()
export default class LogsController {
  /**
   *
   */
  constructor(private readonly chatService: ChatService) {}
  getChatsController = catchAsync(async (req: any, res: any, next: any) => {
    const _getOneCustomer = await this.chatService.getChats(req.params);
    return successResponse(res, _getOneCustomer);
  });

  archiveChatsController = catchAsync(async (req: any, res: any, next: any) => {
    const _archChatCustomer = await this.chatService.archiveChats(
      req.params.roomId
    );
    return successResponse(res, _archChatCustomer);
  });
}
