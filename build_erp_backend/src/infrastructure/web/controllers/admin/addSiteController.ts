import { NextFunction, Request, Response } from "express";
import { IAddSiteControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IAddSiteControllerEntity";
import { IAddSiteToProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectEntity";
import { IListSiteToProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/ListSiteToProjectEntity";
import { IDeleteSiteToProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerInProjectEntity";
import { IAddSiteToprojectFetchProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectFetchProjectEntity";
import { IAddSiteToprojectFetchSitemanagerUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToprojectFetchSitemanagerEntity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { sitemanagerOutput } from "../../../../DTO/SitemanagerEntities/sitemanager";
import { projectOutput } from "../../../../DTO/ProjectEntities/project";



export class AddSiteController implements IAddSiteControllerEntity {
   private addSiteToProjectUseCase: IAddSiteToProjectUseCaseEntity
   private listSiteToProjectUseCase: IListSiteToProjectUseCaseEntity
   private deleteSitetoprojectuseCase: IDeleteSiteToProjectUseCaseEntity
   private addSiteToprojectFetchProjectUseCase: IAddSiteToprojectFetchProjectUseCaseEntity
   private addSiteToprojectFetchSitemanagerUseCase: IAddSiteToprojectFetchSitemanagerUseCaseEntity
   constructor(addSiteToProjectUseCase: IAddSiteToProjectUseCaseEntity, listSiteToProjectUseCase: IListSiteToProjectUseCaseEntity,
      deleteSitetoprojectuseCase: IDeleteSiteToProjectUseCaseEntity, addSiteToprojectFetchProjectUseCase: IAddSiteToprojectFetchProjectUseCaseEntity,
      addSiteToprojectFetchSitemanagerUseCase: IAddSiteToprojectFetchSitemanagerUseCaseEntity) {
      this.addSiteToProjectUseCase = addSiteToProjectUseCase
      this.listSiteToProjectUseCase = listSiteToProjectUseCase
      this.deleteSitetoprojectuseCase = deleteSitetoprojectuseCase
      this.addSiteToprojectFetchProjectUseCase = addSiteToprojectFetchProjectUseCase
      this.addSiteToprojectFetchSitemanagerUseCase = addSiteToprojectFetchSitemanagerUseCase
   }

   //------------------------------------ Add sitemanager in project ------------------------------------//

   saveData = async (req: Request, res: Response):Promise<commonOutput> => {
         const result = await this.addSiteToProjectUseCase.execute(req.body)
         return result
   }

    //------------------------------------ List project data with sitemanager exist using search and page ------------------------------------//

   listSite = async (req: Request, res: Response, next: NextFunction):Promise<sitemanagerOutput | commonOutput> => {
         const { page, search } = req.query
         const result = await this.listSiteToProjectUseCase.execute(Number(page), String(search))
         return result
   }


    //------------------------------------ Set sitemanager as null in project ------------------------------------//

   deleteSite = async (req: Request, res: Response, next: NextFunction):  Promise<commonOutput> => {
         const result = await this.deleteSitetoprojectuseCase.execute(req.params.id, req.params.sitemanagerId)
         return result
   }


    //------------------------------------ Add sitemanager in project ------------------------------------//

   fetchProject = async (req: Request, res: Response, next: NextFunction):  Promise<projectOutput | commonOutput > => {
         const result = await this.addSiteToprojectFetchProjectUseCase.execute()
         return result
   }

    //------------------------------------ List project data with sitemanager exist ------------------------------------//

   fetchSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<sitemanagerOutput | commonOutput> => {
         const result = await this.addSiteToprojectFetchSitemanagerUseCase.execute()
        return result
   }

}
