import { NextFunction, Request, Response } from "express"
import { IProjectController } from "../../domain/Entities/ControllerEntities/AdminControllerEntities/IProjectControllerEntity"
import { IDisplayAllProjectUseCaseEntity } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAllProjectEntity"
import { IDisplayAddProjectUseCaseEntity } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAddProjectEntity"
import { IAddProjectUseCaseEntity } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/AddProjectEntity"
import { IEditProjectUseCaseEntity } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/EditProjectEntity"
import { IDeleteProjectUseCaseEntity } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/DeleteProjectEntity"
import { IChangeStatusUseCaseEntity } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/ChangeStatusEntity"
import { IFetchProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/FetchProjectEntity"
import { fetchProjectIdnameDTO } from "../../application/dto/project.dto"
import { commonOutput } from "../../application/dto/common"
import { IAddSiteToprojectFetchProjectUseCase } from "../../application/interfaces/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectFetchProjectEntity"




export class ProjectController implements IProjectController {
   private displayProjectUseCase: IDisplayAllProjectUseCaseEntity
   private displayAddProjectUseCase: IDisplayAddProjectUseCaseEntity
   private addProjectUseCase: IAddProjectUseCaseEntity
   private editProjectUseCase: IEditProjectUseCaseEntity
   private removeProjectUseCase: IDeleteProjectUseCaseEntity
   private changeStatusUseCase: IChangeStatusUseCaseEntity

   constructor(
      private _FetchProjectUseCase: IFetchProjectUseCase,
      private _addSiteToprojectFetchProjectUseCase:IAddSiteToprojectFetchProjectUseCase,
      displayProjectUseCase: IDisplayAllProjectUseCaseEntity,
      displayAddProjectUseCase: IDisplayAddProjectUseCaseEntity,
      addProjectUseCase: IAddProjectUseCaseEntity,
      editProjectUseCase: IEditProjectUseCaseEntity,
      removeProjectUseCase: IDeleteProjectUseCaseEntity,
      changeStatusUseCase: IChangeStatusUseCaseEntity,
   ) {
      this.displayProjectUseCase = displayProjectUseCase
      this.displayAddProjectUseCase = displayAddProjectUseCase
      this.addProjectUseCase = addProjectUseCase
      this.editProjectUseCase = editProjectUseCase
      this.removeProjectUseCase = removeProjectUseCase
      this.changeStatusUseCase = changeStatusUseCase
   }

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

   projectData = async (req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput> => {
      const { page, search } = req.query
      const result = await this.displayProjectUseCase.execute(Number(page), String(search))
      return result
   }

   //------------------------------------ Add project datas ,Fetch User datas ------------------------------------//

   addProjectdata = async (req: Request, res: Response, next: NextFunction): Promise<userOutput | commonOutput> => {
      const result = await this.displayAddProjectUseCase.execute()
      return result
   }

   //------------------------------------ Save project  ------------------------------------//

   saveProject = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.addProjectUseCase.execute(req.body)
      return result
   }

   //------------------------------------ Update project ------------------------------------//

   updateProject = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.editProjectUseCase.execute({ _id: req.params.id, ...req.body })
      return result
   }

   //------------------------------------ Delete project ------------------------------------//

   removeProject = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.removeProjectUseCase.execute(req.params.id)
      return result
   }

   //------------------------------------ Change project status ------------------------------------//

   projectStatus = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.changeStatusUseCase.execute({ _id: req.params.id, ...req.body })
      return result
   }
}


