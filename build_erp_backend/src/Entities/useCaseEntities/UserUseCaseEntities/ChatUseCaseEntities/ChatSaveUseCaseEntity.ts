import { IChatModelEntity } from "../../../ModelEntities/Chat.Entity";

export interface IChatSaveUseCaseEntity {
   execute(senderId:string, receiverId:string, message:string ):Promise<IChatModelEntity>
}