import { IGetMessageDataUseCase } from "../../IUseCases/IChat/IGetmessageData"
import { ChatSuccessMessage } from "../../../Shared/Messages/Chat.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { chatDataDTO } from "../../dto/chat.dto"
import { IChatRepository } from "../../../domain/Entities/IRepository/IChat"
import { IChatMapper } from "../../../domain/mappers/IChat.mapper"


export class GetMessageDataUseCase implements IGetMessageDataUseCase {
   constructor(
      private _chatRepository: IChatRepository,
      private _chatmapper: IChatMapper
   ) { }
   async execute(userId: string, sitemanagerId: string):
      Promise<commonOutput<chatDataDTO[]> | commonOutput> {
      const messageData = await this._chatRepository.getChatsBetweenUsers({ senderId: userId, receiverId: sitemanagerId })
      const mappedMessage = this._chatmapper.toUserBaseChatMessage(messageData)
      return ResponseHelper.success(ChatSuccessMessage.FETCH, mappedMessage)
   }
}