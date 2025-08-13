import { NextFunction, Request, Response } from "express"
import { chatListOutput } from "../../../DTO/Chat.Entities/Chatlist.Entity"
import { commonOutput } from "../../../DTO/CommonEntities/common"

export interface IChatControllerEntity {
   fetchUserDetailsforChat(req: Request, res: Response, next: NextFunction): Promise<chatListOutput | commonOutput>
}