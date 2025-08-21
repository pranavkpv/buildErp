import { NextFunction, Request, Response } from "express"
import { ISitemanagerControllerEntity } from "../../domain/Entities/ControllerEntities/AdminControllerEntities/ISitemanagerControllerEntity"
import {IDisplayAllSitemanagerUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DisplayAllsitemanagerEntity"
import { IUpdateSitemanagerUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/UpdateSitemanagerEntity"
import { ISaveSitemanagerUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/SaveSitemanagerEntity"
import { IDeleteSitemanagerUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerEntity"
import { ISitemanagerLoginUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/SitemanagerLoginEntity"
import { IListProjectUseCaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/ListProjectUseCaseEntity"
import { ResponseHelper } from "../../Shared/responseHelpers/response"
import { userSuccessMessage } from "../../Shared/Messages/User.Message"
import { commonOutput } from "../../application/dto/common"
import { listSitemanagerDTO } from "../../application/dto/sitemanager.dto"



export class SitemanagerController implements ISitemanagerControllerEntity {

   constructor(
      private _displayAllSitemanagerUseCase: IDisplayAllSitemanagerUseCase,
      private _addSitemanagerUseCase: ISaveSitemanagerUseCase,
      private _editSitemanagerUsecase: IUpdateSitemanagerUseCase,
      private _deleteSitemanagerUseCase: IDeleteSitemanagerUseCase,
      private sitemanagerLoginUseCase: ISitemanagerLoginUseCaseEntity,
      private listProjectUseCase: IListProjectUseCaseEntity
   ) { }


   //------------------------------------ List sitemanager with search and pagination ------------------------------------//

   getSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:listSitemanagerDTO[],totalPage:number}> | commonOutput> => {
      const { page, search } = req.query
      const result = await this._displayAllSitemanagerUseCase.execute({page:Number(page), search:String(search)})
      return result
   }

   //------------------------------------ Save sitemanager ------------------------------------//

   addSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._addSitemanagerUseCase.execute(req.body)
      return result
   }

   //------------------------------------ Edit sitemanager ------------------------------------//

   editSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._editSitemanagerUsecase.execute({ _id: req.params.id, ...req.body })
      return result
   }

   //------------------------------------ Delete sitemanager ------------------------------------//

   deleteSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._deleteSitemanagerUseCase.execute(req.params.id)
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



