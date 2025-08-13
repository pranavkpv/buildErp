import { messageData } from "../../../DTO/Chat.Entities/Chatlist.Entity";
import { IChatModelEntity } from "../../ModelEntities/Chat.Entity";

export interface IChatRepositoryEntity {
   findChatBysenderAndReceiverId(input:messageData): Promise<messageData[]>
   saveChatData(input:messageData):Promise<IChatModelEntity>
}