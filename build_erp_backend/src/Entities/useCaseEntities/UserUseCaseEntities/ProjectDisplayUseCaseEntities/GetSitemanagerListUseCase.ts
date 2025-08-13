import { chatListOutput } from "../../../../DTO/Chat.Entities/Chatlist.Entity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IGetSitemanagerListDataUseCaseEntity {
   execute(_id:string):Promise<chatListOutput | commonOutput>
}