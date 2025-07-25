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


   getSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { page, search } = req.query
      const result = await this.displayAllSitemanagerUseCase.execute(Number(page), String(search))
      res.status(HTTP_STATUS.OK).json(result)
   }


   addSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.addSitemanagerUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   editSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.editSitemanagerUsecase.execute({ _id: req.params.id, ...req.body })
      res.status(result.status_code).json(result)
   }


   deleteSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.deleteSitemanagerUseCase.execute(req.params.id)
      res.status(result.status_code).json(result)
   }


   loginSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
         res.status(result.status_code).json(result)
      } else {
         res.status(result.status_code).json(result)
      }
   }


   logoutSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      res.clearCookie('refreshToken', {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         path: '/',
      });
      const result = ResponseHelper.success(SUCCESS_MESSAGE.USER.LOGOUT,HTTP_STATUS.OK)
      res.status(result.status_code).json(result)
   }


   getSitemanagerProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { user } = req.params
      const result = await this.listProjectUseCase.execute(user)
      res.status(HTTP_STATUS.OK).json(result)
   }
}



