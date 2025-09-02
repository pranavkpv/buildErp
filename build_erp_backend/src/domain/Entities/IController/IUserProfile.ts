import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { userLoginDTO } from '../../../application/dto/user.dto';
import { Tokens } from '../../../application/Entities/token.entity';
import { userBasechatListDTO, userBaseProjectDTO } from '../../../application/dto/project.dto';
import { chatDataDTO } from '../../../application/dto/chat.dto';

export interface IUserprofileController {

    updateProfile(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput | void>;

    updateProfileImage(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput | void>

    logout(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void>;

    changePassword(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void>;

    fetchProjects(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<userBaseProjectDTO[]> | commonOutput | void>;

    fetchChatList(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<userBasechatListDTO[]> | commonOutput | void>;

    fetchMessages(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<chatDataDTO[]> | commonOutput | void>;

    editEmail(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void>;

    editEmailResendOtp(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void>

    editEmailVerifyOTP(req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<userLoginDTO> | commonOutput | void> 

}