import { NextFunction, Request, Response } from "express"
import { IProjectController } from "../../domain/Entities/ControllerEntities/AdminControllerEntities/IProjectControllerEntity"
import { IDisplayAllProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAllProjectEntity"
import { IDisplayAddProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAddProjectEntity"
import { IAddProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/AddProjectEntity"
import { IEditProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/EditProjectEntity"
import { IDeleteProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/DeleteProjectEntity"
import { IChangeStatusUseCase } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/ChangeStatusEntity"
import { IFetchProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/FetchProjectEntity"
import { displayProjectDTO, fetchProjectIdnameDTO } from "../../application/dto/project.dto"
import { commonOutput } from "../../application/dto/common"
import { IAddSiteToprojectFetchProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectFetchProjectEntity"
import { userLoginDTO } from "../../application/dto/user.dto"




export class ProjectController implements IProjectController {
   constructor(
      private _FetchProjectUseCase: IFetchProjectUseCase,
      private _addSiteToprojectFetchProjectUseCase: IAddSiteToprojectFetchProjectUseCase,
      private _displayAddProjectUseCase: IDisplayAddProjectUseCase,
      private _addProjectUseCase: IAddProjectUseCase,
      private _removeProjectUseCase: IDeleteProjectUseCase,
      private _editProjectUseCase: IEditProjectUseCase,
      private _displayProjectUseCase: IDisplayAllProjectUseCase,
      private _changeStatusUseCase: IChangeStatusUseCase
   ) { }

   //------------------------------------ List all Project based on addsitmanager to project  ------------------------------------//

   getprojectAddSitemanagerProject = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput> => {
      const result = await this._addSiteToprojectFetchProjectUseCase.execute()
      return result
   }

   getAllProject = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput> => {
      const result = await this._FetchProjectUseCase.execute()
      return result
   }




   //------------------------------------ List project with search and pagination ------------------------------------//

   projectData = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ data: displayProjectDTO[], totalPage: number }> | commonOutput> => {
      const { page, search } = req.query
      const result = await this._displayProjectUseCase.execute({ page: Number(page), search: String(search) })
      return result
   }

   //------------------------------------ Add project datas ,Fetch User datas ------------------------------------//

   addProjectdata = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<userLoginDTO[]> | commonOutput> => {
      const result = await this._displayAddProjectUseCase.execute()
      return result
   }

   //------------------------------------ Save project  ------------------------------------//

   saveProject = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._addProjectUseCase.execute(req.body)
      return result
   }

   //------------------------------------ Update project ------------------------------------//

   updateProject = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._editProjectUseCase.execute({ _id: req.params.id, ...req.body })
      return result
   }

   //------------------------------------ Delete project ------------------------------------//

   removeProject = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._removeProjectUseCase.execute(req.params.id)
      return result
   }

   //------------------------------------ Change project status ------------------------------------//

   projectStatus = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this._changeStatusUseCase.execute(req.params.id, req.body.status)
      return result
   }
}


