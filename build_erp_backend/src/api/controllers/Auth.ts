import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../application/dto/common';
import { ISignupUserUseCase } from '../../application/IUseCases/IAuth/ISignup';
import { IResendOTPUseCase } from '../../application/IUseCases/IAuth/IResendOtp';
import { IUserLoginUseCase } from '../../application/IUseCases/IAuth/IUserLogin';
import { IAuthController } from '../../domain/Entities/IController/IAuth';
import { userLoginDTO } from '../../application/dto/user.dto';
import { Tokens } from '../../application/entities/token.entity';
import { IGoogleloginUseCase } from '../../application/IUseCases/IAuth/IGoogleLogin';
import { ISendOTPUseCase } from '../../application/IUseCases/IAuth/ISendOtp';
import { IVerifyForgotpasswordUseCase } from '../../application/IUseCases/IAuth/IVerifyForgotPasswordOtp';
import { IUpdatePasswordUseCase } from '../../application/IUseCases/IAuth/IUpdatepassword';
import { IGetAllProjectListInUserusecase } from '../../application/IUseCases/IAuth/IGetallProjectInUser';
import { publicProjectDTO } from '../../application/dto/project.dto';
import { IFetchExistEstimationUseCase } from '../../application/IUseCases/IEstimation/IFetchExistEstimation';
import { publicEstimationDTO } from '../../application/dto/estimation.dto';
import { IFetchStatusUseCase } from '../../application/IUseCases/IStageStatusUpdation/IFetchStageStatus';
import { publicstageDTO } from '../../application/dto/stage.dto';
import { IFetchStatusBaseProjectUseCase } from '../../application/IUseCases/IProject/IFetchStatusBaseProject';
import { ResponseHelper } from '../../Shared/responseHelpers/response';
import { IRefreshTokenUseCase } from '../../application/IUseCases/IAuth/IRefreshToken';
import { IVerifyOTPUseCase } from '../../application/IUseCases/IAuth/IVerifyOtp';

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
      private _refreshTokenUseCase: IRefreshTokenUseCase,
    ) { }

    //   Register a new user 
    registerUser = async(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput | void> => {
        try {
            return await this._signupUserUseCase.execute(req.body);
        } catch (error) {
            next(error);
        }
    };

    /** Verify OTP during signup */
    verifySignupOtp = async(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput | void> => {
        try {
            return await this._verifyOtpUseCase.execute(req.body);
        } catch (error) {
            next(error);
        }
    };

    /** Resend OTP for signup */
    resendSignupOtp = async(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput | void> => {
        try {
            return await this._resendOtpUseCase.execute(req.body.email);
        } catch (error) {
            next(error);
        }
    };

    /** User login with credentials */
    loginUser = async(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput | void> => {
        try {
            const result = await this._userLoginUseCase.execute(req.body);
            if (result.success && result.data?.tokens.refreshToken) {
                res.cookie('refreshToken', result.data?.tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 24 * 60 * 60 * 1000,
                });
            }
            return result;
        } catch (error) {
            next(error);
        }
    };

    /** User login with Google */
    loginWithGoogle = async(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput | void> => {
        try {
            const result = await this._googleAuthUseCase.execute(req.body);
            if (result.success && result.data?.tokens.refreshToken) {
                res.cookie('refreshToken', result.data?.tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 24 * 60 * 60 * 1000,
                });
            }
            return result;
        } catch (error) {
            next(error);
        }
    };

    /** Send OTP for verification */
    sendOtp = async(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput | void> => {
        try {
            return await this._sendOtpUseCase.execute(req.body);
        } catch (error) {
            next(error);
        }
    };

    /** Verify OTP for forgot password */
    verifyForgotPasswordOtp = async(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput | void> => {
        try {
            return await this._verifyForgotOtpUseCase.execute(req.body);
        } catch (error) {
            next(error);
        }
    };

    /** Update user password */
    updateUserPassword = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
        try {
            return await this._updatePasswordUseCase.execute(req.body);
        } catch (error) {
            next(error);
        }
    };

    /** Fetch projects available for the user */
    fetchUserProjects = async(req: Request, res: Response, next: NextFunction):
    Promise<commonOutput<publicProjectDTO[]> | void> => {
        try {
            return await this._getUserProjectsUseCase.execute();
        } catch (error) {
            next(error);
        }
    };

    /** Fetch existing estimation by project ID */
    fetchExistEstimation = async(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput<publicEstimationDTO[]> | void> => {
        try {
            return await this._fetchexistestimationusecase.execute(req.params.id);
        } catch (error) {
            next(error);
        }
    };

    /** Fetch stage data of a project */
    fetchStageData = async(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput<publicstageDTO[]> | void> => {
        try {
            const project_id = req.params.id;
            return await this._fetchStatusUseCase.execute(project_id);
        } catch (error) {
            next(error);
        }
    };

    /** Fetch project status data based on filters */
    fetchProjectStatusByFilters = async(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput<{ projectData: publicProjectDTO[]; totalPage: number }> | commonOutput | void> => {
        try {
            const { searchItem, selectedArea, page } = req.query;
            const status = req.params.status;
            return await this._fetchStatusBaseProjectUseCase.execute({
                status,
                search: String(searchItem),
                area: Number(selectedArea),
                page: Number(page),
            });
        } catch (error) {
            next(error);
        }
    };

    /** Handle refresh token to generate new access token */
    handleRefreshToken = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput<string> | commonOutput | void> => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return ResponseHelper.conflictData("user not exist")
            }
            return await this._refreshTokenUseCase.execute(refreshToken);
        } catch (error) {
            next(error);
        }
    };
}
