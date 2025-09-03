import { NextFunction, Request, Response } from 'express';
import { IUserprofileController } from '../../domain/Entities/IController/IUserProfile';
import { commonOutput } from '../../application/dto/common';
import { ResponseHelper } from '../../Shared/responseHelpers/response';
import { IJwtService } from '../../domain/Entities/Service.Entities/IJwtservice';
import { IUpdateProfileUseCase } from '../../application/IUseCases/IUserProfile/IUpdateProfile';
import { userLoginDTO } from '../../application/dto/user.dto';
import { Tokens } from '../../application/Entities/token.entity';
import { FileArray, UploadedFile } from 'express-fileupload';
import cloudinary from '../../infrastructure/config/cloudinary';
import { IUpdateProfileImageUseCase } from '../../application/IUseCases/IUserProfile/IUpdateProfileImage';
import { IChangePasswordUseCase } from '../../application/IUseCases/IUserProfile/IChangePassword';
import { IFetchUserProjectUseCase } from '../../application/IUseCases/IProject/IFetchUserProject';
import { userBasechatListDTO, userBaseProjectDTO } from '../../application/dto/project.dto';
import { IGetSitemanagerListDataUseCase } from '../../application/IUseCases/IProject/IGetSitemanagerList';
import { chatDataDTO } from '../../application/dto/chat.dto';
import { IGetMessageDataUseCase } from '../../application/IUseCases/IChat/IGetmessageData';
import { userFailedMessage, userSuccessMessage } from '../../Shared/Messages/User.Message';
import { IBlackListUseCase } from '../../application/IUseCases/IAuth/IBlackList';
import { IEditEmailUseCase } from '../../application/IUseCases/IUserProfile/IEditEmail';
import { IEditEmailResendOTPUseCase } from '../../application/IUseCases/IUserProfile/IEditEmailResendOTP';
import { IEditEmailVerifyOtpUseCase } from '../../application/IUseCases/IUserProfile/IEditEmailVerifyOtp';

export class UserProfileController implements IUserprofileController {
    constructor(
        private _jwtservice: IJwtService,
        private _updateProfileUseCase: IUpdateProfileUseCase,
        private _updateProfileImageUseCase: IUpdateProfileImageUseCase,
        private _changePasswordUseCase: IChangePasswordUseCase,
        private _fetchUserprojectUseCase: IFetchUserProjectUseCase,
        private _getChatListUseCase: IGetSitemanagerListDataUseCase,
        private _getMessagesUseCase: IGetMessageDataUseCase,
        private _blacklistUsecase: IBlackListUseCase,
        private _editEmailUseCase: IEditEmailUseCase,
        private _editEmailResendOTPUseCase: IEditEmailResendOTPUseCase,
        private _editEmailVerifyOTPUseCase: IEditEmailVerifyOtpUseCase,
       
    ) { }

    // Update user profile details
    updateProfile = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput | void> => {
        try {
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];
            if (!accessToken) return ResponseHelper.unAuthor();

            const payload = await this._jwtservice.verifyAccessToken(accessToken);
            if (!payload) return ResponseHelper.unAuthor();

            return await this._updateProfileUseCase.execute({ _id: payload._id, ...req.body });
        } catch (error) {
            next(error);
        }
    };

    // Update user profile image
    updateProfileImage = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput | void> => {
        try {
            const files = req.files as FileArray;
            const file = files?.file as UploadedFile | undefined;

            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];
            if (!accessToken) return ResponseHelper.unAuthor();

            const payload = await this._jwtservice.verifyAccessToken(accessToken);
            if (!payload) return ResponseHelper.unAuthor();

            if (!file || Array.isArray(file)) return;

            const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, { folder: 'buildExe' });
            return await this._updateProfileImageUseCase.execute(uploadResult.secure_url, payload._id);
        } catch (error) {
            next(error);
        }
    };

    // Change user password
    changePassword = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];
            if (!accessToken) return ResponseHelper.unAuthor();

            const payload = await this._jwtservice.verifyAccessToken(accessToken);
            if (!payload) return ResponseHelper.unAuthor();

            return await this._changePasswordUseCase.execute({ _id: payload._id, ...req.body });
        } catch (error) {
            next(error);
        }
    };

    // Fetch user assigned projects
    fetchProjects = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<userBaseProjectDTO[]> | commonOutput | void> => {
        try {
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];
            if (!accessToken) return ResponseHelper.unAuthor();

            const payload = await this._jwtservice.verifyAccessToken(accessToken);
            if (!payload) return ResponseHelper.unAuthor();

            return await this._fetchUserprojectUseCase.execute(payload._id);
        } catch (error) {
            next(error);
        }
    };

    // Fetch chat list for the user
    fetchChatList = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<userBasechatListDTO[]> | commonOutput | void> => {
        try {
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];
            if (!accessToken) return ResponseHelper.unAuthor();
            const payload = await this._jwtservice.verifyAccessToken(accessToken);
            console.log(payload);
            if (!payload) return ResponseHelper.unAuthor();
            return await this._getChatListUseCase.execute(payload._id);
        } catch (error) {
            next(error);
        }
    };

    // Fetch messages with a site manager
    fetchMessages = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<chatDataDTO[]> | commonOutput | void> => {
        try {
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];
            if (!accessToken) return ResponseHelper.unAuthor();

            const payload = await this._jwtservice.verifyAccessToken(accessToken);
            if (!payload) return ResponseHelper.unAuthor();

            const sitemanagerId = req.params.id;
            return await this._getMessagesUseCase.execute(payload._id, sitemanagerId);
        } catch (error) {
            next(error);
        }
    };

    // Logout user and blacklist access token
    logout = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];
            if (!accessToken) return ResponseHelper.unAuthor();

            const payload = await this._jwtservice.verifyAccessToken(accessToken);
            if (!payload) return ResponseHelper.unAuthor();

            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
            });

            const blackList = await this._blacklistUsecase.execute(accessToken);
            if (!blackList) {
                return ResponseHelper.conflictData(userFailedMessage.BLACK_LIST_FAIL);
            }

            return ResponseHelper.success(userSuccessMessage.LOGOUT);
        } catch (error) {
            next(error);
        }
    };
    editEmail = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];
            if (!accessToken) return ResponseHelper.unAuthor();

            const payload = await this._jwtservice.verifyAccessToken(accessToken);
            if (!payload) return ResponseHelper.unAuthor()
            const result = await this._editEmailUseCase.execute(req.body.email, payload._id)
            return result
        } catch (error) {
            next(error)
        }
    };
    editEmailResendOtp = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._editEmailResendOTPUseCase.execute()
            return result
        } catch (error) {
            next(error)
        }
    }
    editEmailVerifyOTP = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<userLoginDTO> | commonOutput | void> => {
        try {
            const result = await this._editEmailVerifyOTPUseCase.execute(req.body.otp)
            return result
        } catch (error) {
            next(error)
        }
    }
}
