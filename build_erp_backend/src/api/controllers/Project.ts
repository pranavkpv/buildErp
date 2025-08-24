import { NextFunction, Request, Response } from "express"
import { IProjectController } from "../../domain/Entities/Controller.Entity/IProject"
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
      private _fetchProjectUseCase: IFetchProjectUseCase,
      private _addSiteToProjectFetchProjectUseCase: IAddSiteToprojectFetchProjectUseCase,
      private _displayAddProjectUseCase: IDisplayAddProjectUseCase,
      private _addProjectUseCase: IAddProjectUseCase,
      private _deleteProjectUseCase: IDeleteProjectUseCase,
      private _editProjectUseCase: IEditProjectUseCase,
      private _displayProjectUseCase: IDisplayAllProjectUseCase,
      private _changeStatusUseCase: IChangeStatusUseCase
   ) { }

   //  Fetch projects available for assigning site managers
   getProjectsForSiteManager = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput | void> => {
      try {
         const result = await this._addSiteToProjectFetchProjectUseCase.execute()
         return result
      } catch (error) {
         return next(error)
      }
   }

   //  Fetch all projects
   getAllProjects = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput | void> => {
      try {
         const result = await this._fetchProjectUseCase.execute()
         return result
      } catch (error) {
         return next(error)
      }
   }

   // Fetch paginated & searchable project list
   getPaginatedProjects = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: displayProjectDTO[], totalPage: number }> | commonOutput | void> => {
      try {
         const { page, search } = req.query
         const result = await this._displayProjectUseCase.execute({ page: Number(page), search: String(search) })
         return result
      } catch (error) {
         return next(error)
      }
   }

   //  Fetch data needed before adding a project (e.g., user list)
   getAddProjectData = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<userLoginDTO[]> | commonOutput | void> => {
      try {
         const result = await this._displayAddProjectUseCase.execute()
         return result
      } catch (error) {
         return next(error)
      }
   }

   // Save new project
   createProject = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._addProjectUseCase.execute(req.body)
         return result
      } catch (error) {
         return next(error)
      }
   }

   // Update existing project
   updateProject = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._editProjectUseCase.execute({ _id: req.params.id, ...req.body })
         return result
      } catch (error) {
         return next(error)
      }
   }

   // Delete a project
   deleteProject = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._deleteProjectUseCase.execute(req.params.id)
         return result
      } catch (error) {
         return next(error)
      }
   }

   // Change project status (active/inactive)
   changeProjectStatus = async (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
      try {
         const result = await this._changeStatusUseCase.execute(req.params.id, req.body.status)
         return result
      } catch (error) {
         return next(error)
      }
   }
}
