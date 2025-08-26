import { IChatModelEntity } from "../../../domain/Entities/modelEntities/chat.entity"
import { IChatRepository } from "../../../domain/Entities/IRepository/IChat"
import { savingChatInput } from "../../Entities/chat.entity"
import { IChatSaveUseCase } from "../../IUseCases/IChat/IChatSave"


export class ChatSaveusecase implements IChatSaveUseCase {
   constructor(
      private _chatRepository: IChatRepository
   ) { }
   async execute(input: savingChatInput):
      Promise<IChatModelEntity> {
      const data = await this._chatRepository.createChat(input)
      return data
   }
}