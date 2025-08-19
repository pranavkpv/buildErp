import { fetchingChatInput, savingChatInput } from "../../../application/entities/chat.entity";
import { IChatModelEntity } from "../../Entities/modelEntities/chat.entity";

export interface IChatRepository {
   findChatBysenderAndReceiverId(input:fetchingChatInput): Promise<IChatModelEntity[]>
   saveChatData(input:savingChatInput):Promise<IChatModelEntity>
}