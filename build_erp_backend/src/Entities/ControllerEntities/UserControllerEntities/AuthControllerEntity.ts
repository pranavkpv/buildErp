import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { Tokens } from "../../Input-OutputEntities/auth";

export interface IAuthControllerEntity {
   signUp(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   verifyOTP(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   resendOtp(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   login(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   refreshToken(req: Request, res: Response, next: NextFunction):Promise<Tokens | commonOutput>
   SendOTP(req: Request, res: Response, next: NextFunction):Promise<commonOutput> 
   verifyForgotOTP(req: Request, res: Response, next: NextFunction):Promise<commonOutput> 
   updatePassword(req: Request, res: Response, next: NextFunction): Promise<commonOutput> 
   logout(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   UpdateProfile(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   updateProfileImage(req: Request, res: Response, next: NextFunction):  Promise<commonOutput | void>
   GoogleLogin(req: Request, res: Response, next: NextFunction): Promise<commonOutput> 
   ChangePassword(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}