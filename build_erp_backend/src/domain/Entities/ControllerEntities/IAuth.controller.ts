import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../application/dto/common";
import { userLoginDTO } from "../../../application/dto/user.dto";
import { Tokens } from "../../../application/entities/token.entity";
import { publicProjectDTO } from "../../../application/dto/project.dto";
import { publicEstimationDTO } from "../../../application/dto/estimation.dto";
import { publicstageDTO } from "../../../application/dto/stage.dto";


export interface IAuthController {
   register(req: Request, res: Response, next: NextFunction): Promise<commonOutput>;
   verifySignupOtp(req: Request, res: Response, next: NextFunction): Promise<commonOutput>;
   resendSignupOtp(req: Request, res: Response, next: NextFunction): Promise<commonOutput>;
   login(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput>;
   loginWithGoogle(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput>;
   sendOtp(req: Request, res: Response, next: NextFunction): Promise<commonOutput>;
   verifyForgotPasswordOtp(req: Request, res: Response, next: NextFunction): Promise<commonOutput>;
   updatePassword(req: Request, res: Response, next: NextFunction): Promise<commonOutput>;
   fetchUserProjects(req: Request, res: Response, next: NextFunction): Promise<commonOutput<publicProjectDTO[]>>;
   fetchExistEstimation(req: Request, res: Response, next: NextFunction): Promise<commonOutput<publicEstimationDTO[]>>;
   fetchStageData(req: Request, res: Response, next: NextFunction): Promise<commonOutput<publicstageDTO[]>>
   fetchProjectStatusBaseProject(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{projectData:publicProjectDTO[],totalPage:number}> | commonOutput>;
}
