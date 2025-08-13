import { IChatModelEntity } from "../../Entities/ModelEntities/Chat.Entity"
import { IChatRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IChatRepository"
import { IChatSaveUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/ChatUseCaseEntities/ChatSaveUseCaseEntity"


export class ChatSaveusecase implements IChatSaveUseCaseEntity {
   private chatRepository : IChatRepositoryEntity 
   constructor(chatRepository : IChatRepositoryEntity){
      this.chatRepository = chatRepository
   }
   async execute(senderId: string, receiverId: string, message: string): Promise<IChatModelEntity> {
      const data = await this.chatRepository.saveChatData({senderId,receiverId,message})
      return data
   }
}