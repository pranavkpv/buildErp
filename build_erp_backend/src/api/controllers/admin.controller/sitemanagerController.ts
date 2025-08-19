import { NextFunction, Request, Response } from "express"
import { ISitemanagerControllerEntity } from "../../../domain/Entities/ControllerEntities/AdminControllerEntities/ISitemanagerControllerEntity"
import { IDisplayAllSitemanagerUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DisplayAllsitemanagerEntity"
import { IUpdateSitemanagerUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/UpdateSitemanagerEntity"
import { ISaveSitemanagerUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/SaveSitemanagerEntity"
import { IDeleteSitemanagerUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerEntity"
import { ISitemanagerLoginUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/SitemanagerLoginEntity"
import { IListProjectUseCaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/ListProjectUseCaseEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../../application/dto/CommonEntities/common"
import { sitemanagerOutput } from "../../../application/dto/SitemanagerEntities/sitemanager"
import { projectOutput } from "../../../application/dto/ProjectEntities/project"
import { userSuccessMessage } from "../../../Shared/Messages/User.Message"



export class SitemanagerController implements ISitemanagerControllerEntity {
   private displayAllSitemanagerUseCase: IDisplayAllSitemanagerUseCaseEntity
   private addSitemanagerUseCase: ISaveSitemanagerUseCaseEntity
   private editSitemanagerUsecase: IUpdateSitemanagerUseCaseEntity
   private deleteSitemanagerUseCase: IDeleteSitemanagerUseCaseEntity
   private sitemanagerLoginUseCase: ISitemanagerLoginUseCaseEntity
   private listProjectUseCase: IListProjectUseCaseEntity
   constructor(
      displayAllSitemanagerUseCase: IDisplayAllSitemanagerUseCaseEntity,
      addSitemanagerUseCase: ISaveSitemanagerUseCaseEntity,
      editSitemanagerUsecase: IUpdateSitemanagerUseCaseEntity,
      deleteSitemanagerUseCase: IDeleteSitemanagerUseCaseEntity,
      sitemanagerLoginUseCase: ISitemanagerLoginUseCaseEntity,
      listProjectUseCase: IListProjectUseCaseEntity
   ) {
      this.displayAllSitemanagerUseCase = displayAllSitemanagerUseCase
      this.addSitemanagerUseCase = addSitemanagerUseCase
      this.editSitemanagerUsecase = editSitemanagerUsecase
      this.deleteSitemanagerUseCase = deleteSitemanagerUseCase
      this.sitemanagerLoginUseCase = sitemanagerLoginUseCase
      this.listProjectUseCase = listProjectUseCase
   }


   //------------------------------------ List sitemanager with search and pagination ------------------------------------//

   getSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<sitemanagerOutput | commonOutput> => {
      const { page, search } = req.query
      const result = await this.displayAllSitemanagerUseCase.execute(Number(page), String(search))
      return result
   }

   //------------------------------------ Save sitemanager ------------------------------------//

   addSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.addSitemanagerUseCase.execute(req.body)
      return result
   }

   //------------------------------------ Edit sitemanager ------------------------------------//

   editSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.editSitemanagerUsecase.execute({ _id: req.params.id, ...req.body })
      return result
   }

   //------------------------------------ Delete sitemanager ------------------------------------//

   deleteSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.deleteSitemanagerUseCase.execute(req.params.id)
      return result
   }

   //------------------------------------ Login sitemanager  ------------------------------------//

   loginSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const { email, password } = req.body
      const result = await this.sitemanagerLoginUseCase.execute(email, password)
      if (result.success && result.token?.refreshToken) {
         res.cookie('refreshToken', result.token.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
         });
      }

      return result

   }

   //------------------------------------ Logout sitemanager ------------------------------------//

   logoutSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      res.clearCookie('refreshToken', {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         path: '/',
      });
      const result = ResponseHelper.success(userSuccessMessage.LOGOUT)
      return result
   }


   //------------------------------------ List all sitemanager ------------------------------------//

   getSitemanagerProject = async (req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput> => {
      const { user } = req.params
      const result = await this.listProjectUseCase.execute(user)
      return result
   }
}



