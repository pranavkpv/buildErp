import { NextFunction, Request, Response } from "express";
import { IAddSiteControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IAddSiteControllerEntity";
import { IAddSiteToProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectEntity";
import { IListSiteToProject } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/ListSiteToProjectEntity";
import { IDeleteSiteToProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerInProjectEntity";
import { HTTP_STATUS } from "../../../../Shared/Status_code";
import { IAddSiteToprojectFetchProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectFetchProjectEntity";
import { IAddSiteToprojectFetchSitemanagerUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToprojectFetchSitemanagerEntity";



export class AddSiteController implements IAddSiteControllerEntity {
   private addSiteToProjectUseCase: IAddSiteToProjectUseCase
   private listSiteToProjectUseCase: IListSiteToProject
   private deleteSitetoprojectuseCase: IDeleteSiteToProjectUseCase
   private addSiteToprojectFetchProjectUseCase: IAddSiteToprojectFetchProjectUseCase
   private addSiteToprojectFetchSitemanagerUseCase: IAddSiteToprojectFetchSitemanagerUseCase
   constructor(addSiteToProjectUseCase: IAddSiteToProjectUseCase, listSiteToProjectUseCase: IListSiteToProject,
      deleteSitetoprojectuseCase: IDeleteSiteToProjectUseCase, addSiteToprojectFetchProjectUseCase: IAddSiteToprojectFetchProjectUseCase,
      addSiteToprojectFetchSitemanagerUseCase: IAddSiteToprojectFetchSitemanagerUseCase) {
      this.addSiteToProjectUseCase = addSiteToProjectUseCase
      this.listSiteToProjectUseCase = listSiteToProjectUseCase
      this.deleteSitetoprojectuseCase = deleteSitetoprojectuseCase
      this.addSiteToprojectFetchProjectUseCase = addSiteToprojectFetchProjectUseCase
      this.addSiteToprojectFetchSitemanagerUseCase = addSiteToprojectFetchSitemanagerUseCase
   }

   saveData = async (req: Request, res: Response): Promise<void> => {
         const result = await this.addSiteToProjectUseCase.execute(req.body)
         res.status(result.status_code).json(result)
   }


   listSite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
         const { page, search } = req.query
         const result = await this.listSiteToProjectUseCase.execute(Number(page), String(search))
         res.status(HTTP_STATUS.OK).json(result)
   }


   deleteSite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
         const result = await this.deleteSitetoprojectuseCase.execute(req.params.id, req.params.sitemanagerId)
         res.status(result.status_code).json(result)
   }


   fetchProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
         const result = await this.addSiteToprojectFetchProjectUseCase.execute()
         res.status(HTTP_STATUS.OK).json(result)
   }

   
   fetchSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
         const result = await this.addSiteToprojectFetchSitemanagerUseCase.execute()
         res.status(HTTP_STATUS.OK).json(result)
   }

}
