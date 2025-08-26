import { IChatModelEntity } from "../../../domain/Entities/modelEntities/chat.entity";
import { savingChatInput } from "../../Entities/chat.entity";

export interface IChatSaveUseCase {
   execute(input: savingChatInput):
      Promise<IChatModelEntity>
}