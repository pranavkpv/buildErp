import { chatListOutput } from "../../../../DTO/Chat.Entities/Chatlist.Entity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IFetchUserUsecaseEntity {
   execute(userId:string): Promise<chatListOutput | commonOutput>
}