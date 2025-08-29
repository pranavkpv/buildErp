import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { userLoginDTO } from '../../../application/dto/user.dto';
import { Tokens } from '../../../application/Entities/token.entity';
import { publicProjectDTO } from '../../../application/dto/project.dto';
import { publicEstimationDTO } from '../../../application/dto/estimation.dto';
import { publicstageDTO } from '../../../application/dto/stage.dto';


export interface IAuthController {

   registerUser(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>;

   verifySignupOtp(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>;

   resendSignupOtp(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>;

   loginUser(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput | void>;

   loginWithGoogle(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput | void>;

   sendOtp(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>;

   verifyForgotPasswordOtp(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>;

   updateUserPassword(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>;

   fetchUserProjects(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<publicProjectDTO[]> | void>;

   fetchExistEstimation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<publicEstimationDTO[]> | void>;

   fetchStageData(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<publicstageDTO[]> | void>

   fetchProjectStatusByFilters(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ projectData: publicProjectDTO[]; totalPage: number }> | commonOutput | void>

   handleRefreshToken(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<string> | commonOutput | void>
}
