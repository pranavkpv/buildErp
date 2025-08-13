import { chatListOutput } from "../../../../DTO/Chat.Entities/Chatlist.Entity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IGetMessageDataUseCaseEntity {
   execute(userId:string,sitemanagerId:string) : Promise<chatListOutput | commonOutput>
}