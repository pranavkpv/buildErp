import { chatListOutput } from "../../../dto/Chat.Entities/Chatlist.Entity";
import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IFetchUserUsecaseEntity {
   execute(userId:string): Promise<chatListOutput | commonOutput>
}