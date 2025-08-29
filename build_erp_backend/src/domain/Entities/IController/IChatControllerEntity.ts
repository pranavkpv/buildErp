import { NextFunction, Request, Response } from 'express';
import { chatListOutput } from '../../../../application/dto/Chat.Entities/Chatlist.Entity';
import { commonOutput } from '../../../../application/dto/CommonEntities/common';

export interface IChatControllerEntity {
   fetchUserDetailsforChat(req: Request, res: Response, next: NextFunction): Promise<chatListOutput | commonOutput>
}