import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../application/dto/common";
import { ISignupUserUseCase } from "../../application/interfaces/useCase.Entity/Auth.UseCase/ISignup.usecase";
import { IVerifyOTPUseCase } from "../../application/interfaces/useCase.Entity/Auth.UseCase/IVerifyotp.usecase.ts";
import { IResendOTPUseCase } from "../../application/interfaces/useCase.Entity/Auth.UseCase/IResendotp.usecase";
import { IUserLoginUseCase } from "../../application/interfaces/useCase.Entity/Auth.UseCase/IUserlogin.usecase";
import { IAuthController } from "../../domain/Entities/ControllerEntities/IAuth.controller";
import { userLoginDTO } from "../../application/dto/user.dto";
import { Tokens } from "../../application/entities/token.entity";
import { IGoogleloginUseCase } from "../../application/interfaces/useCase.Entity/Auth.UseCase/IGooglelogin.usecase";
import { ISendOTPUseCase } from "../../application/interfaces/useCase.Entity/Auth.UseCase/ISendotp.usecase";
import { IVerifyForgotpasswordUseCase } from "../../application/interfaces/useCase.Entity/Auth.UseCase/IVerifyforgotpassword.usecase";
import { IUpdatePasswordUseCase } from "../../application/interfaces/useCase.Entity/Auth.UseCase/IUpdatepassword.usecase";
import { IGetAllProjectListInUserusecase } from "../../application/interfaces/useCase.Entity/Auth.UseCase/IGetallproject.usecase";
import { publicProjectDTO } from "../../application/dto/project.dto";
import { IFetchExistEstimationUseCase } from "../../application/interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/Ifetchexistestimation.usecase";
import { publicEstimationDTO } from "../../application/dto/estimation.dto";
import { IFetchStatusUseCase } from "../../application/interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/IFetchstatus.usecase";
import { publicstageDTO } from "../../application/dto/stage.dto";
import { IFetchStatusBaseProjectUseCase } from "../../application/interfaces/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchStatusBaseProjectUseCaseEntity";
import { ResponseHelper } from "../../Shared/responseHelpers/response";
import { IRefreshTokenUseCase } from "../../application/interfaces/useCase.Entity/Auth.UseCase/RefreshToken.UseCase.Entity";

export class AuthController implements IAuthController {

   constructor(
      private _signupUserUseCase: ISignupUserUseCase,
      private _verifyOtpUseCase: IVerifyOTPUseCase,
      private _resendOtpUseCase: IResendOTPUseCase,
      private _userLoginUseCase: IUserLoginUseCase,
      private _googleAuthUseCase: IGoogleloginUseCase,
      private _sendOtpUseCase: ISendOTPUseCase,
      private _verifyForgotOtpUseCase: IVerifyForgotpasswordUseCase,
      private _updatePasswordUseCase: IUpdatePasswordUseCase,
      private _getUserProjectsUseCase: IGetAllProjectListInUserusecase,
      private _fetchexistestimationusecase: IFetchExistEstimationUseCase,
      private _fetchStatusUseCase: IFetchStatusUseCase,
      private _fetchStatusBaseProjectUseCase: IFetchStatusBaseProjectUseCase,
      private _refreshTokenUseCase: IRefreshTokenUseCase
   ) { }

   register = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      return await this._signupUserUseCase.execute(req.body);
   }

   verifySignupOtp = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      return await this._verifyOtpUseCase.execute(req.body);
   }

   resendSignupOtp = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      return await this._resendOtpUseCase.execute(req.body);
   }

   login = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput> => {
      const result = await this._userLoginUseCase.execute(req.body);
      if (result.success && result.data?.tokens.refreshToken) {
         res.cookie('refreshToken', result.data?.tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
         });
      }
      return result;
   }

   loginWithGoogle = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput> => {
      const result = await this._googleAuthUseCase.execute(req.body);
      if (result.success && result.data?.tokens.refreshToken) {
         res.cookie('refreshToken', result.data?.tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
         });
      }
      return result;
   }

   sendOtp = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      return await this._sendOtpUseCase.execute(req.body);
   }

   verifyForgotPasswordOtp = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      return await this._verifyForgotOtpUseCase.execute(req.body);
   }


   updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      return await this._updatePasswordUseCase.execute(req.body);
   }

   fetchUserProjects = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<publicProjectDTO[]>> => {
      return await this._getUserProjectsUseCase.execute();
   }

   fetchExistEstimation = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<publicEstimationDTO[]>> => {
      const result = await this._fetchexistestimationusecase.execute(req.params.id)
      return result
   }

   fetchStageData = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<publicstageDTO[]>> => {
      const project_id = req.params.id
      const data = await this._fetchStatusUseCase.execute(project_id);
      return data
   }

   fetchProjectStatusBaseProject = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ projectData: publicProjectDTO[], totalPage: number }> | commonOutput> => {
      const { searchItem, selectedArea, page } = req.query
      const status = req.params.status
      const result = await this._fetchStatusBaseProjectUseCase.execute({ status, search: String(searchItem), area: Number(selectedArea), page: Number(page) })
      return result
   }

   handleRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<string> | commonOutput> => {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return ResponseHelper.unAuthor();
      return await this._refreshTokenUseCase.execute(refreshToken);
   }

}
