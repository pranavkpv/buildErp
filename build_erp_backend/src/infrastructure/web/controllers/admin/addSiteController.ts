import { NextFunction, Request, Response } from "express";
import { IAddSiteControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IAddSiteControllerEntity";
import { IAddSiteToProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectEntity";
import { IListSiteToProject } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/ListSiteToProjectEntity";
import { IDeleteSiteToProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerInProjectEntity";
import { IAddSiteToprojectFetchProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectFetchProjectEntity";
import { IAddSiteToprojectFetchSitemanagerUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToprojectFetchSitemanagerEntity";
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../../../Entities/ModelEntities/ProjectEntity";
import { ISitemanagerModelEntity } from "../../../../Entities/ModelEntities/Sitemanager.Entity";
import { sitemanagerOutput } from "../../../../Entities/Input-OutputEntities/SitemanagerEntities/sitemanager";
import { projectOutput } from "../../../../Entities/Input-OutputEntities/ProjectEntities/project";



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
