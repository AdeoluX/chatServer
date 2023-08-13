import httpStatus from 'http-status';
import { generateToken } from '../utils/tokenManagement';
import { abortIf } from '../utils/responder';
import { Service } from 'typedi';
import MessageRepo from '../dbservices/message.table';

@Service()
export default class AuthService {
  /**
   *
   */
  constructor(
    private readonly messageRepo: MessageRepo
  ) {}
  getChats = async (data: any) => {
    const {roomId} = data
    const messages = await this.messageRepo.find({roomId})
    return messages;
  };
}
