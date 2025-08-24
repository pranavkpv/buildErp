import { NextFunction, Request, Response } from "express"
import { ISitemanagerController } from "../../domain/Entities/Controller.Entity/ISitemanager"
import { IDisplayAllSitemanagerUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DisplayAllsitemanagerEntity"
import { IUpdateSitemanagerUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/UpdateSitemanagerEntity"
import { ISaveSitemanagerUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/SaveSitemanagerEntity"
import { IDeleteSitemanagerUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerEntity"
import { ISitemanagerLoginUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/SitemanagerLoginEntity"
import { IListProjectUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/ListProjectUseCaseEntity"
import { ResponseHelper } from "../../Shared/responseHelpers/response"
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message"
import { commonOutput } from "../../application/dto/common"
import { listSitemanagerDTO } from "../../application/dto/sitemanager.dto"
import { ISitemanagerModelEntity } from "../../domain/Entities/modelEntities/sitemanager.entity"
import { Tokens } from "../../application/entities/token.entity"
import { IProjectModelEntity } from "../../domain/Entities/modelEntities/project.entity"
import { IJwtService } from "../../domain/Entities/Service.Entities/IJwtservice"
import { IBlackListUseCase } from "../../application/interfaces/UserUseCaseEntities/AuthenticationUseCaseEntities/IBlackListAccessToken.Usecase"
import { IUpdateSitemanagerPasswordUseCase } from "../../application/interfaces/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/UpdateSitemanagerPasswordEntity"

export class SitemanagerController implements ISitemanagerController {

   constructor(
      private _displayAllSitemanagerUseCase: IDisplayAllSitemanagerUseCase,
      private _addSitemanagerUseCase: ISaveSitemanagerUseCase,
      private _editSitemanagerUsecase: IUpdateSitemanagerUseCase,
      private _deleteSitemanagerUseCase: IDeleteSitemanagerUseCase,
      private sitemanagerLoginUseCase: ISitemanagerLoginUseCaseEntity,
      private listProjectUseCase: IListProjectUseCaseEntity,
      private _jwtservice: IJwtService,
      private _blacklistusecase: IBlackListUseCase,
      private _updateSitemanagerPassword: IUpdateSitemanagerPasswordUseCase
   ) { }

   // Get list of sitemanagers with pagination and search
   getSitemanagers = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listSitemanagerDTO[], totalPage: number }> | commonOutput | void> => {
      try {
         const { page, search } = req.query;
         const result = await this._displayAllSitemanagerUseCase.execute({ page: Number(page), search: String(search) });
         return result;
      } catch (error) {
         return next(error);
      }
   }

   // Create a new sitemanager
   createSitemanager = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._addSitemanagerUseCase.execute(req.body);
         return result;
      } catch (error) {
         return next(error);
      }
   }

   // Update sitemanager details
   updateSitemanager = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._editSitemanagerUsecase.execute({ _id: req.params.id, ...req.body });
         return result;
      } catch (error) {
         return next(error);
      }
   }

   // Delete sitemanager by ID
   deleteSitemanager = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._deleteSitemanagerUseCase.execute(req.params.id);
         return result;
      } catch (error) {
         return next(error);
      }
   }

   // Login sitemanager and issue tokens
   loginSitemanager = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: ISitemanagerModelEntity, token: Tokens }> | commonOutput | void> => {
      try {
         const { email, password } = req.body;
         const result = await this.sitemanagerLoginUseCase.execute(email, password);

         if (!result.data) {
            return ResponseHelper.conflictData(userFailedMessage.ERROR);
         }

         if (result.success && result.data.token?.refreshToken) {
            res.cookie('refreshToken', result.data.token.refreshToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: 'lax',
               maxAge: 24 * 60 * 60 * 1000,
               path: '/',
            });
         }

         return result;
      } catch (error) {
         return next(error);
      }
   }

   // Logout sitemanager and blacklist token
   logoutSitemanager = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const userHeader = req.headers.authorization;
         const accessToken = userHeader?.split(" ")[1];

         if (!accessToken) {
            return ResponseHelper.unAuthor();
         }

         const payload = await this._jwtservice.verifyAccessToken(accessToken);
         if (!payload) {
            return ResponseHelper.unAuthor();
         }

         res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
         });

         const blackList = await this._blacklistusecase.execute(accessToken);
         if (!blackList) {
            return ResponseHelper.conflictData(userFailedMessage.BLACK_LIST_FAIL);
         }

         return ResponseHelper.success(userSuccessMessage.LOGOUT);
      } catch (error) {
         return next(error);
      }
   }

   // Get projects assigned to a sitemanager
   getSitemanagerProjects = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<IProjectModelEntity[]> | commonOutput | void> => {
      try {
         const { user } = req.params;
         const result = await this.listProjectUseCase.execute(user);
         return result;
      } catch (error) {
         return next(error);
      }
   }

   // Change sitemanager password
   changePassword = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._updateSitemanagerPassword.execute({ _id: req.params.id, ...req.body });
         return result;
      } catch (error) {
         return next(error);
      }
   }
}
