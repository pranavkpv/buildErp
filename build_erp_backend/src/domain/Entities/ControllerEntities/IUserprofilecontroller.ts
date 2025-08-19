import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../application/dto/common";
import { userLoginDTO } from "../../../application/dto/user.dto";
import { Tokens } from "../../../application/entities/token.entity";
import { userBasechatListDTO, userBaseProjectDTO } from "../../../application/dto/project.dto";
import { chatDataDTO } from "../../../application/dto/chat.dto";

export interface IUserprofileController {
    updateProfile(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput>;
    updateProfileImage(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput | void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<commonOutput>;
    changePassword(req: Request, res: Response, next: NextFunction): Promise<commonOutput>;
    fetchProject(req: Request, res: Response, next: NextFunction):  Promise<commonOutput<userBaseProjectDTO[]> | commonOutput>
    fetchChatList(req: Request, res: Response, next: NextFunction): Promise<commonOutput<userBasechatListDTO[]> | commonOutput>; 
    fetchMessages(req: Request, res: Response, next: NextFunction):  Promise<commonOutput<chatDataDTO[]> | commonOutput>;
}