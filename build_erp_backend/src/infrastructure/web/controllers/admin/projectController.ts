import { NextFunction, Request, Response } from "express"
import { IProjectControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IProjectControllerEntity"
import { IDisplayAllProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAllProjectEntity"
import { IDisplayAddProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAddProjectEntity"
import { IAddProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/AddProjectEntity"
import { IEditProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/EditProjectEntity"
import { IDeleteProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DeleteProjectEntity"
import { IChangeStatusUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/ChangeStatusEntity"
import { IFetchProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/FetchProjectEntity"
import { IUserModelEntity } from "../../../../Entities/ModelEntities/User.Entity"
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common"
import { projectOutput } from "../../../../Entities/Input-OutputEntities/ProjectEntities/project"
import { userOutput } from "../../../../Entities/Input-OutputEntities/UserEntities/user"




export class ProjectController implements IProjectControllerEntity {
   private displayProjectUseCase: IDisplayAllProjectUseCase
   private displayAddProjectUseCase: IDisplayAddProjectUseCase
   private addProjectUseCase: IAddProjectUseCase
   private editProjectUseCase: IEditProjectUseCase
   private removeProjectUseCase: IDeleteProjectUseCase
   private changeStatusUseCase: IChangeStatusUseCase
   private FetchProjectUseCase: IFetchProjectUseCase
   constructor(
      displayProjectUseCase: IDisplayAllProjectUseCase,
      displayAddProjectUseCase: IDisplayAddProjectUseCase,
      addProjectUseCase: IAddProjectUseCase,
      editProjectUseCase: IEditProjectUseCase,
      removeProjectUseCase: IDeleteProjectUseCase,
      changeStatusUseCase: IChangeStatusUseCase,
      FetchProjectUseCase: IFetchProjectUseCase
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


