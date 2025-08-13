import { NextFunction, Request, Response } from "express"
import { IProjectControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IProjectControllerEntity"
import { IDisplayAllProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAllProjectEntity"
import { IDisplayAddProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAddProjectEntity"
import { IAddProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/AddProjectEntity"
import { IEditProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/EditProjectEntity"
import { IDeleteProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DeleteProjectEntity"
import { IChangeStatusUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/ChangeStatusEntity"
import { IFetchProjectUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/FetchProjectEntity"
import { commonOutput } from "../../../../DTO/CommonEntities/common"
import { projectOutput } from "../../../../DTO/ProjectEntities/project"
import { userOutput } from "../../../../DTO/UserEntities/user"




export class ProjectController implements IProjectControllerEntity {
   private displayProjectUseCase: IDisplayAllProjectUseCaseEntity
   private displayAddProjectUseCase: IDisplayAddProjectUseCaseEntity
   private addProjectUseCase: IAddProjectUseCaseEntity
   private editProjectUseCase: IEditProjectUseCaseEntity
   private removeProjectUseCase: IDeleteProjectUseCaseEntity
   private changeStatusUseCase: IChangeStatusUseCaseEntity
   private FetchProjectUseCase: IFetchProjectUseCaseEntity
   constructor(
      displayProjectUseCase: IDisplayAllProjectUseCaseEntity,
      displayAddProjectUseCase: IDisplayAddProjectUseCaseEntity,
      addProjectUseCase: IAddProjectUseCaseEntity,
      editProjectUseCase: IEditProjectUseCaseEntity,
      removeProjectUseCase: IDeleteProjectUseCaseEntity,
      changeStatusUseCase: IChangeStatusUseCaseEntity,
      FetchProjectUseCase: IFetchProjectUseCaseEntity
   ) {
      this.displayProjectUseCase = displayProjectUseCase
      this.displayAddProjectUseCase = displayAddProjectUseCase
      this.addProjectUseCase = addProjectUseCase
      this.editProjectUseCase = editProjectUseCase
      this.removeProjectUseCase = removeProjectUseCase
      this.changeStatusUseCase = changeStatusUseCase
      this.FetchProjectUseCase = FetchProjectUseCase
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

   //------------------------------------ List all Project  ------------------------------------//

   getProject = async (req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput> => {
      const result = await this.FetchProjectUseCase.execute()
      return result
   }
}


