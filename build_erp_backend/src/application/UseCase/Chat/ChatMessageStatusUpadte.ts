import { IChatRepository } from "../../../domain/Entities/IRepository/IChat";
import { IChatModelEntity } from "../../../domain/Entities/modelEntities/chat.entity";
import { IChatMessageStatusUpateUseCase } from "../../IUseCases/IChat/IChatMessageStatusUpate";

export class ChatMessageStatusUpdateUseCase implements IChatMessageStatusUpateUseCase {
   constructor(
      private _chatRepository: IChatRepository
   ) { }
   async execute(id: string): Promise<IChatModelEntity | null> {
      console.log("pranbuguguhuhu")
      await this._chatRepository.updateMessageStatus(id)
      const updatedData = await this._chatRepository.getChatById(id)
      return updatedData
   }
}