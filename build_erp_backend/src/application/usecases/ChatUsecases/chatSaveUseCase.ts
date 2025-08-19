import { IChatModelEntity } from "../../../domain/Entities/modelEntities/chat.entity"
import { IChatRepository } from "../../../domain/interfaces/Project-management/IChatRepository"
import { savingChatInput } from "../../entities/chat.entity"
import { IChatSaveUseCase } from "../../interfaces/UserUseCaseEntities/ChatUseCaseEntities/ChatSaveUseCaseEntity"


export class ChatSaveusecase implements IChatSaveUseCase {
   constructor(private _chatRepository: IChatRepository) { }
   async execute(input:savingChatInput): Promise<IChatModelEntity> {
      const data = await this._chatRepository.saveChatData(input)
      return data
   }
}