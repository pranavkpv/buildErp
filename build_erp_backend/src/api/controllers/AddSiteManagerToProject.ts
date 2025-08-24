import { NextFunction, Request, Response } from "express";
import { IAddSiteManagerToProjectController } from "../../domain/Entities/Controller.Entity/IAddSitemanagerToProject";
import { IAddSiteToProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectEntity";
import { IListSiteToProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/ListSiteToProjectEntity";
import { IDeleteSiteToProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DeleteSitemanagerInProjectEntity";
import { IAddSiteToprojectFetchSitemanagerUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/IAddSiteToProjectFetchSitemanagerUsecase";
import { commonOutput } from "../../application/dto/common";
import { FetchsitemanagerInListDTO, listAddsiteDTO } from "../../application/dto/addsitemanagerToproject";


export class AddSiteManagerToProjectController implements IAddSiteManagerToProjectController {
      constructor(
            private _fetchSitemanagerUseCase: IAddSiteToprojectFetchSitemanagerUseCase,
            private _addSiteToProjectUseCase: IAddSiteToProjectUseCase,
            private _deleteSiteManagerUseCase: IDeleteSiteToProjectUseCase,
            private _listSiteToProjectUseCase: IListSiteToProjectUseCase,
      ) { }

      //  Fetch all site managers linked to projects
      fetchSiteManagers = async (req: Request, res: Response, next: NextFunction):
            Promise<commonOutput<FetchsitemanagerInListDTO[]> | commonOutput | void> => {
            try {
                  const result = await this._fetchSitemanagerUseCase.execute();
                  return result;
            } catch (error) {
                  next(error);
            }
      };

      //  Add a site manager to a project
      addSiteManagerToProject = async (req: Request, res: Response, next: NextFunction):
            Promise<commonOutput | void> => {
            try {
                  const result = await this._addSiteToProjectUseCase.execute(req.body);
                  return result;
            } catch (error) {
                  next(error);
            }
      };

      //  Remove a site manager from a project (set as null)
      removeSiteManagerFromProject = async (req: Request, res: Response, next: NextFunction):
            Promise<commonOutput | void> => {
            try {
                  const result = await this._deleteSiteManagerUseCase.execute(
                        req.params.id,
                        req.params.sitemanagerId
                  );
                  return result;
            } catch (error) {
                  next(error);
            }
      };

      //  List projects with site managers (with pagination & search)
      listProjectsWithSiteManagers = async (req: Request, res: Response, next: NextFunction):
            Promise<commonOutput<{ data: listAddsiteDTO[]; totalPage: number }> | commonOutput | void> => {
            try {
                  const { page, search } = req.query;
                  const result = await this._listSiteToProjectUseCase.execute(
                        Number(page),
                        String(search)
                  );
                  return result;
            } catch (error) {
                  next(error);
            }
      };
}
