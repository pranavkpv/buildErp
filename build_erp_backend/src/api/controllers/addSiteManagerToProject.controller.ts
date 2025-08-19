import { NextFunction, Request, Response } from "express";
import { IAddSiteManagerToProjectController } from "../../domain/Entities/ControllerEntities/AdminControllerEntities/IAddSiteControllerEntity";
import { IAddSiteToProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectEntity";
import { IListSiteToProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/ListSiteToProjectEntity";
import { IDeleteSiteToProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerInProjectEntity";
import { IAddSiteToprojectFetchSitemanagerUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/IAddSiteToProjectFetchSitemanagerUsecase";
import { commonOutput } from "../../application/dto/common";
import { FetchsitemanagerInListDTO, listAddsiteDTO } from "../../application/dto/addsitemanagerToproject";




export class AddSiteManagerToProjectController implements IAddSiteManagerToProjectController {
      constructor(
            private _addSiteToprojectFetchSitemanagerUseCase: IAddSiteToprojectFetchSitemanagerUseCase,
            private _addSiteToProjectUseCase: IAddSiteToProjectUseCase,
            private _deleteSitetoprojectuseCase: IDeleteSiteToProjectUseCase,
            private _listSiteToProjectUseCase: IListSiteToProjectUseCase,
      ) { }

      //------------------------------------ List project data with sitemanager exist ------------------------------------//

      fetchSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<FetchsitemanagerInListDTO[]> | commonOutput> => {
            const result = await this._addSiteToprojectFetchSitemanagerUseCase.execute()
            return result
      }

      //------------------------------------ Add sitemanager in project ------------------------------------//

      saveData = async (req: Request, res: Response): Promise<commonOutput> => {
            const result = await this._addSiteToProjectUseCase.execute(req.body)
            return result
      }

      //------------------------------------ Set sitemanager as null in project ------------------------------------//

      deleteSite = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
            const result = await this._deleteSitetoprojectuseCase.execute(req.params.id, req.params.sitemanagerId)
            return result
      }

      //------------------------------------ List project data with sitemanager exist using search and page ------------------------------------//

      listSite = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:listAddsiteDTO[],totalPage:number}> | commonOutput> => {
            const { page, search } = req.query
            const result = await this._listSiteToProjectUseCase.execute(Number(page), String(search))
            return result
      }

}
