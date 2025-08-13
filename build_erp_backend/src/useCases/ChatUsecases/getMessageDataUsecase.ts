import { chatListOutput } from "../../DTO/Chat.Entities/Chatlist.Entity"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { IChatRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IChatRepository"
import { IGetMessageDataUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/ChatUseCaseEntities/GetmessageDatauseCase"
import { ChatSuccessMessage } from "../../Shared/Messages/Chat.Message"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"


export class GetMessageDataUseCase implements IGetMessageDataUseCaseEntity {
   private chatRepository: IChatRepositoryEntity
   constructor(chatRepository: IChatRepositoryEntity) {
      this.chatRepository = chatRepository
   }
   async execute(userId: string, sitemanagerId: string): Promise<chatListOutput | commonOutput> {
      const messageData = await this.chatRepository.findChatBysenderAndReceiverId({ senderId: userId, receiverId: sitemanagerId })
      return ResponseHelper.success(ChatSuccessMessage.FETCH, messageData)
   }
}