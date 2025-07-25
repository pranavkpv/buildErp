import { NextFunction, Request, Response } from "express";
import { IAuthControllerEntity } from "../../../../Entities/ControllerEntities/UserControllerEntities/AuthControllerEntity";
import { ISignupUserUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/SignupUserEntity";
import { IVerifyOTPUseCases } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/VerifyOTPEntity";
import { IResendOTPUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/ResendOTPEntity";
import { IRefreshTokenUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/RefreshTokenEntity";
import { IUserLoginUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UserLoginEntity";
import { IgooglAuthUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/GoogleAuthEntity";
import { ISendOTPUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/SendOTPEntity";
import { IVerifyForgotUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/VerifyForgotEntity";
import { IUpdatePasswordUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdatePasswordEntity";
import { ResponseHelper } from "../../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../../Shared/Message";
import { HTTP_STATUS } from "../../../../Shared/Status_code";
import { IUpdateProfileUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdateProfileEntity";
import cloudinary from "../../../../config/cloudinary";
import { IUpdateProfileImageUseCase } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdateProfileImageEntity";
import { UploadedFile, FileArray } from "express-fileupload";




export class AuthController implements IAuthControllerEntity {
   private signupUserUseCase: ISignupUserUseCase
   private verifyOTPUseCase: IVerifyOTPUseCases
   private resendOTPUseCase: IResendOTPUseCase
   private userLoginUseCase: IUserLoginUseCase
   private refreshTokenUseCase: IRefreshTokenUseCase
   private googleauthuseCase: IgooglAuthUseCase
   private sendotpUsecase: ISendOTPUseCase
   private verifyforgotUsecase: IVerifyForgotUseCase
   private updatePasswordUseCase: IUpdatePasswordUseCase
   private updateProfileUseCase: IUpdateProfileUseCase
   private updateProfileImageUseCase: IUpdateProfileImageUseCase
   constructor(signupUserUseCase: ISignupUserUseCase, verifyOTPUseCase: IVerifyOTPUseCases,
      resendOTPUseCase: IResendOTPUseCase, userLoginUseCase: IUserLoginUseCase,
      refreshTokenUseCase: IRefreshTokenUseCase, googleauthuseCase: IgooglAuthUseCase,
      sendotpUsecase: ISendOTPUseCase, verifyforgotUsecase: IVerifyForgotUseCase,
      updatePasswordUseCase: IUpdatePasswordUseCase, updateProfileUseCase: IUpdateProfileUseCase,
      updateProfileImageUseCase: IUpdateProfileImageUseCase) {
      this.signupUserUseCase = signupUserUseCase
      this.verifyOTPUseCase = verifyOTPUseCase
      this.resendOTPUseCase = resendOTPUseCase
      this.userLoginUseCase = userLoginUseCase
      this.refreshTokenUseCase = refreshTokenUseCase
      this.googleauthuseCase = googleauthuseCase
      this.sendotpUsecase = sendotpUsecase
      this.verifyforgotUsecase = verifyforgotUsecase
      this.updatePasswordUseCase = updatePasswordUseCase
      this.updateProfileUseCase = updateProfileUseCase
      this.updateProfileImageUseCase = updateProfileImageUseCase
   }

   signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.signupUserUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.verifyOTPUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.resendOTPUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.userLoginUseCase.execute(req.body)
      if (result.success && result.token?.refreshToken) {
         res.cookie('refreshToken', result.token.refreshToken, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
         });
         res.status(result.status_code).json(result)
      } else {
         res.status(result.status_code).json(result)
      }
   }


   refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
         const result = ResponseHelper.failure(ERROR_MESSAGE.USER.NO_REFRESH_TOKEN, HTTP_STATUS.UNAUTHORIZED)
         res.status(result.status_code).json(result);
         return;
      }
      const tokens = await this.refreshTokenUseCase.execute(refreshToken);
      res.status(HTTP_STATUS.OK).json({ accessToken: tokens.accessToken });
   }


   authLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.googleauthuseCase.execute(req.body)
      if (result.success && result.token?.refreshToken) {
         res.cookie('refreshToken', result.token.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
         });
         res.status(result.status_code).json(result)
      } else {
         res.status(result.status_code).json(result);
      }
   }


   SendOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.sendotpUsecase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   verifyForgotOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.verifyforgotUsecase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.updatePasswordUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      res.clearCookie("refreshToken", {
         httpOnly: false,
         sameSite: "lax",
         secure: process.env.NODE_ENV === "production"
      });
      const result = ResponseHelper.success(SUCCESS_MESSAGE.USER.LOGOUT, HTTP_STATUS.OK)
      res.status(result.status_code).json(result)
   }
   UpdateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params
      const result = await this.updateProfileUseCase.execute({ id, ...req.body })
      res.status(result.status_code).json(result)
   }
   updateProfileImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const _id = req.params.id
      const files = req.files as FileArray;

      const file = files?.file as UploadedFile | undefined;
      if (!file || Array.isArray(file)) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({ error: ERROR_MESSAGE.ESTIMATION.NO_IMAGE });
         return
      }
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
         folder: "buildExe"
      })
      const ExactResult = await this.updateProfileImageUseCase.execute(result.secure_url, _id)
      res.status(ExactResult.status_code).json(ExactResult)
   }
}


