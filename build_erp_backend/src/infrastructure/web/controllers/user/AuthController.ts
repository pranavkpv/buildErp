import { NextFunction, Request, Response } from "express";
import { RefreshTokenUseCase } from "../../../../useCases/user/Dashboard/RefreshTokenUseCase";
import { googlAuthUseCase } from "../../../../useCases/auth/GoogleAuthUseCase";
import { SignupUserUseCase } from "../../../../useCases/user/Dashboard/SignupUserUseCase";
import { VerifyOTPUseCases } from "../../../../useCases/user/Dashboard/VerifyOTPuseCases";
import { ResendOTPUseCase } from "../../../../useCases/user/Dashboard/ResendOTPUseCase";
import { UserLoginUseCase } from "../../../../useCases/user/Dashboard/UserLoginUseCase";
import { SendOTPUseCase } from "../../../../useCases/user/Dashboard/SendOTPUseCase";
import { VerifyForgotUseCase } from "../../../../useCases/user/Dashboard/VerifyForgotUseCase";
import { UpdatePasswordUseCase } from "../../../../useCases/user/Dashboard/UpdatePasswordUseCase";




export class AuthController {
   private signupUserUseCase: SignupUserUseCase
   private verifyOTPUseCase: VerifyOTPUseCases
   private resendOTPUseCase: ResendOTPUseCase
   private userLoginUseCase: UserLoginUseCase
   private refreshTokenUseCase: RefreshTokenUseCase
   private googleauthuseCase: googlAuthUseCase
   private sendotpUsecase: SendOTPUseCase
   private verifyforgotUsecase: VerifyForgotUseCase
   private updatePasswordUseCase : UpdatePasswordUseCase
   constructor(signupUserUseCase: SignupUserUseCase, verifyOTPUseCase: VerifyOTPUseCases,
      resendOTPUseCase: ResendOTPUseCase, userLoginUseCase: UserLoginUseCase,
      refreshTokenUseCase: RefreshTokenUseCase, googleauthuseCase: googlAuthUseCase,
      sendotpUsecase: SendOTPUseCase, verifyforgotUsecase: VerifyForgotUseCase,
   updatePasswordUseCase : UpdatePasswordUseCase) {
      this.signupUserUseCase = signupUserUseCase
      this.verifyOTPUseCase = verifyOTPUseCase
      this.resendOTPUseCase = resendOTPUseCase
      this.userLoginUseCase = userLoginUseCase
      this.refreshTokenUseCase = refreshTokenUseCase
      this.googleauthuseCase = googleauthuseCase
      this.sendotpUsecase = sendotpUsecase
      this.verifyforgotUsecase = verifyforgotUsecase
      this.updatePasswordUseCase = updatePasswordUseCase
   }
   signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.signupUserUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         next(error)
      }
   }
   verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.verifyOTPUseCase.execute(req.body)
         res.status(201).json(result)
      } catch (error) {
         next(error)
      }
   }
   resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.resendOTPUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         next(error)
      }
   }
   login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.userLoginUseCase.execute(req.body)
         if (result.success && result.tokens?.refreshToken) {
            res.cookie('refreshToken', result.tokens.refreshToken, {
               httpOnly: false,
               secure: false,
               sameSite: 'lax',
               maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json(result)
         } else {
            res.status(200).json(result);
         }

      } catch (error) {
         next(error)
      }
   }
   refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const refreshToken = req.cookies.refreshToken;
         if (!refreshToken) {
            res.status(401).json({ message: 'No refresh token provided' });
            return;
         }
         const tokens = await this.refreshTokenUseCase.execute(refreshToken);
         res.status(200).json({ accessToken: tokens.accessToken });
      } catch (error) {
         next(error);
      }
   };
   authLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.googleauthuseCase.execute(req.body)
         if (result.success && result.tokens?.refreshToken) {
            res.cookie('refreshToken', result.tokens.refreshToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: 'lax',
               maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json(result)
         } else {
            res.status(200).json(result);
         }
      } catch (error) {
         console.log(error)
         next(error);
      }
   }

   SendOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.sendotpUsecase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error);
      }
   }
   verifyForgotOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.verifyforgotUsecase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error);
      }
   }
   updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.updatePasswordUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error);
      }
   }
   logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log("haiiii")
      res.clearCookie("refreshToken", {
        httpOnly: false,
        sameSite: "lax", 
        secure: process.env.NODE_ENV === "production"
      });
      res.status(200).json({success:true,message:"Logout successfully"})
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}


