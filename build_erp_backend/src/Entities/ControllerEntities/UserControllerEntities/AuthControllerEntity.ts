import { NextFunction, Request, Response } from "express";

export interface IAuthControllerEntity {
   signUp(req: Request, res: Response, next: NextFunction): Promise<void>
   verifyOTP(req: Request, res: Response, next: NextFunction): Promise<void>
   resendOtp(req: Request, res: Response, next: NextFunction): Promise<void>
   login(req: Request, res: Response, next: NextFunction): Promise<void>
   refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>
   authLogin(req: Request, res: Response, next: NextFunction): Promise<void>
   SendOTP(req: Request, res: Response, next: NextFunction): Promise<void>
   verifyForgotOTP(req: Request, res: Response, next: NextFunction): Promise<void>
   updatePassword(req: Request, res: Response, next: NextFunction): Promise<void>
   logout(req: Request, res: Response, next: NextFunction): Promise<void>
   UpdateProfile(req: Request, res: Response, next: NextFunction): Promise<void>
}