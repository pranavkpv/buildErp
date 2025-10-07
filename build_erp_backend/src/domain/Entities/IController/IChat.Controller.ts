import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { chatListDTO } from '../../../application/dto/user.dto';


export interface IChatControllerEntity {
   fetchUserDetailsforChat(req: Request, res: Response, next: NextFunction):  Promise<commonOutput<chatListDTO[]> | commonOutput>
}