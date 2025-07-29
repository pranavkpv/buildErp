import { NextFunction, Request, Response } from "express"
import { ISitemanagerControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/ISitemanagerControllerEntity"
import { IDisplayAllSitemanagerUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DisplayAllsitemanagerEntity"
import { IUpdateSitemanagerUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/UpdateSitemanagerEntity"
import { ISaveSitemanagerUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/SaveSitemanagerEntity"
import { IDeleteSitemanagerUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerEntity"
import { ISitemanagerLoginUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/SitemanagerLoginEntity"
import { IListProjectUseCase } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/ListProjectUseCaseEntity"
import { HTTP_STATUS } from "../../../../Shared/Status_code"
import { ResponseHelper } from "../../../../Shared/utils/response"
import { SUCCESS_MESSAGE } from "../../../../Shared/Message"
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IProjectModelEntity } from "../../../../Entities/ModelEntities/ProjectEntity"
import { sitemanagerOutput } from "../../../../Entities/Input-OutputEntities/SitemanagerEntities/sitemanager"
import { projectOutput } from "../../../../Entities/Input-OutputEntities/ProjectEntities/project"



export class SitemanagerController implements ISitemanagerControllerEntity {
   private displayAllSitemanagerUseCase: IDisplayAllSitemanagerUseCase
   private addSitemanagerUseCase: ISaveSitemanagerUseCase
   private editSitemanagerUsecase: IUpdateSitemanagerUseCase
   private deleteSitemanagerUseCase: IDeleteSitemanagerUseCase
   private sitemanagerLoginUseCase: ISitemanagerLoginUseCase
   private listProjectUseCase: IListProjectUseCase
   constructor(
      displayAllSitemanagerUseCase: IDisplayAllSitemanagerUseCase,
      addSitemanagerUseCase: ISaveSitemanagerUseCase,
      editSitemanagerUsecase: IUpdateSitemanagerUseCase,
      deleteSitemanagerUseCase: IDeleteSitemanagerUseCase,
      sitemanagerLoginUseCase: ISitemanagerLoginUseCase,
      listProjectUseCase: IListProjectUseCase
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
      const result = ResponseHelper.success(SUCCESS_MESSAGE.USER.LOGOUT, HTTP_STATUS.OK)
      return result
   }


   //------------------------------------ List all sitemanager ------------------------------------//

   getSitemanagerProject = async (req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput> => {
      const { user } = req.params
      const result = await this.listProjectUseCase.execute(user)
      return result
   }
}



