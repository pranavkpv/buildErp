import { NextFunction, Request, Response } from "express";
import { IAuthControllerEntity } from "../../../../Entities/ControllerEntities/UserControllerEntities/AuthControllerEntity";
import { ISignupUserUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/SignupUserEntity";
import { IVerifyOTPUseCasesEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/VerifyOTPEntity";
import { IResendOTPUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/ResendOTPEntity";
import { IRefreshTokenUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/RefreshTokenEntity";
import { IUserLoginUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UserLoginEntity";
import { IgooglAuthUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/GoogleAuthEntity";
import { ISendOTPUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/SendOTPEntity";
import { IVerifyForgotUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/VerifyForgotEntity";
import { IUpdatePasswordUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdatePasswordEntity";
import { ResponseHelper } from "../../../../Shared/ResponseHelper/response";
import { HTTP_STATUS } from "../../../../Shared/Status_code";
import { IUpdateProfileUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdateProfileEntity";
import cloudinary from "../../../../config/cloudinary";
import { IUpdateProfileImageUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdateProfileImageEntity";
import { UploadedFile, FileArray } from "express-fileupload";
import { IChangePasswordUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/ChangePasswordEntity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { Tokens } from "../../../../DTO/AuthEntities/auth";
import { chatListOutput } from "../../../../DTO/Chat.Entities/Chatlist.Entity";
import { IGetSitemanagerListDataUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/GetSitemanagerListUseCase";
import { IGetMessageDataUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/ChatUseCaseEntities/GetmessageDatauseCase";
import { JwtService } from "../../../../services/JwtService";
import { EstimationFailedMessage } from "../../../../Shared/Messages/Estimation.Message";
import { userSuccessMessage } from "../../../../Shared/Messages/User.Message";
import { IGetAllProjectListInUserUseCaseEntity } from "../../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/GetAllProjectListInUserUseCaseEntity";




export class AuthController implements IAuthControllerEntity {
   private signupUserUseCase: ISignupUserUseCaseEntity
   private verifyOTPUseCase: IVerifyOTPUseCasesEntity
   private resendOTPUseCase: IResendOTPUseCaseEntity
   private userLoginUseCase: IUserLoginUseCaseEntity
   private refreshTokenUseCase: IRefreshTokenUseCaseEntity
   private googleauthuseCase: IgooglAuthUseCaseEntity
   private sendotpUsecase: ISendOTPUseCaseEntity
   private verifyforgotUsecase: IVerifyForgotUseCaseEntity
   private updatePasswordUseCase: IUpdatePasswordUseCaseEntity
   private updateProfileUseCase: IUpdateProfileUseCaseEntity
   private updateProfileImageUseCase: IUpdateProfileImageUseCaseEntity
   private changePasswordUseCase: IChangePasswordUseCaseEntity
   private jwtService: JwtService
   private getSitemanagerListDatauseCase: IGetSitemanagerListDataUseCaseEntity
   private getmessageDataUsecase: IGetMessageDataUseCaseEntity
   private getAllProjectListInUserUseCase: IGetAllProjectListInUserUseCaseEntity
   constructor(signupUserUseCase: ISignupUserUseCaseEntity, verifyOTPUseCase: IVerifyOTPUseCasesEntity,
      resendOTPUseCase: IResendOTPUseCaseEntity, userLoginUseCase: IUserLoginUseCaseEntity,
      refreshTokenUseCase: IRefreshTokenUseCaseEntity, googleauthuseCase: IgooglAuthUseCaseEntity,
      sendotpUsecase: ISendOTPUseCaseEntity, verifyforgotUsecase: IVerifyForgotUseCaseEntity,
      updatePasswordUseCase: IUpdatePasswordUseCaseEntity, updateProfileUseCase: IUpdateProfileUseCaseEntity,
      updateProfileImageUseCase: IUpdateProfileImageUseCaseEntity, changePasswordUseCase: IChangePasswordUseCaseEntity,
      jwtService: JwtService, getSitemanagerListDatauseCase: IGetSitemanagerListDataUseCaseEntity,
      getmessageDataUsecase: IGetMessageDataUseCaseEntity, getAllProjectListInUserUseCase: IGetAllProjectListInUserUseCaseEntity) {
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
      this.changePasswordUseCase = changePasswordUseCase
      this.jwtService = jwtService
      this.getSitemanagerListDatauseCase = getSitemanagerListDatauseCase
      this.getmessageDataUsecase = getmessageDataUsecase
      this.getAllProjectListInUserUseCase = getAllProjectListInUserUseCase
   }

   //------------------------------------ Signup user controller  ------------------------------------//

   signUp = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.signupUserUseCase.execute(req.body)
      return result
   }

   //------------------------------------ Verify OTP for signup user controller   ------------------------------------//

   verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.verifyOTPUseCase.execute(req.body)
      return result
   }

   //------------------------------------ Resend OTP controller  ------------------------------------//

   resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.resendOTPUseCase.execute(req.body)
      return result
   }

   //------------------------------------ Login User controller  ------------------------------------//

   login = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.userLoginUseCase.execute(req.body)
      if (result.success && result.token?.refreshToken) {
         res.cookie('refreshToken', result.token.refreshToken, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
         });
      }
      return result
   }

   //------------------------------------ Create access token using refresh token  ------------------------------------//

   refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<Tokens | commonOutput> => {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
         const result = ResponseHelper.unAuthor()
         return result
      }
      const tokens = await this.refreshTokenUseCase.execute(refreshToken);
      return tokens
   }

   //------------------------------------ Login with google ------------------------------------//

   GoogleLogin = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.googleauthuseCase.execute(req.body)
      if (result.success && result.token?.refreshToken) {
         res.cookie('refreshToken', result.token.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
         });
      }
      return result
   }

   //------------------------------------ Send otp ------------------------------------//

   SendOTP = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.sendotpUsecase.execute(req.body)
      return result
   }

   //------------------------------------ Verify OTP for forgot password  ------------------------------------//

   verifyForgotOTP = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.verifyforgotUsecase.execute(req.body)
      return result
   }

   //------------------------------------ Update password controller ------------------------------------//

   updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.updatePasswordUseCase.execute(req.body)
      return result
   }

   //------------------------------------ Logout user controller ------------------------------------//

   logout = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      res.clearCookie("refreshToken", {
         httpOnly: false,
         sameSite: "lax",
         secure: process.env.NODE_ENV === "production"
      });
      const result = ResponseHelper.success(userSuccessMessage.LOGOUT)
      return result
   }

   //------------------------------------ Update profile details of user ------------------------------------//

   UpdateProfile = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const { id } = req.params
      const result = await this.updateProfileUseCase.execute({ id, ...req.body })
      return result
   }

   //------------------------------------ Upload profile image of user ------------------------------------//

   updateProfileImage = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      const _id = req.params.id
      const files = req.files as FileArray;
      const file = files?.file as UploadedFile | undefined;
      if (!file || Array.isArray(file)) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({ error: EstimationFailedMessage.NO_IMAGE });
         return
      }
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
         folder: "buildExe"
      })

      const ExactResult = await this.updateProfileImageUseCase.execute(result.secure_url, _id)

      return ExactResult
   }

   //------------------------------------ Password Changing controller  ------------------------------------//

   ChangePassword = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const { id } = req.params
      const result = await this.changePasswordUseCase.execute({ _id: id, ...req.body })
      return result
   }


   fetChatList = async (req: Request, res: Response, next: NextFunction): Promise<chatListOutput | commonOutput> => {
      const token = req.cookies.refreshToken
      const tokenData = await this.jwtService.verifyRefreshToken(token)
      if (tokenData) {
         const data = await this.getSitemanagerListDatauseCase.execute(tokenData.userId)
         return data
      } else {
         return ResponseHelper.unAuthor()
      }
   }
   fetchMessage = async (req: Request, res: Response, next: NextFunction): Promise<chatListOutput | commonOutput> => {
      const token = req.cookies.refreshToken
      const sitemanagerId = req.params.id
      const tokenData = await this.jwtService.verifyRefreshToken(token)
      if (tokenData) {
         const data = await this.getmessageDataUsecase.execute(tokenData.userId, sitemanagerId)
         return data
      } else {
         return ResponseHelper.unAuthor()
      }
   }
   fetchAllProjectListInUser = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const data = await this.getAllProjectListInUserUseCase.execute()
      return data
   }
}



