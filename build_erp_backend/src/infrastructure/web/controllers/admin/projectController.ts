import { NextFunction, Request, Response } from "express"
import { IProjectControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IProjectControllerEntity"
import { IDisplayAllProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAllProjectEntity"
import { IDisplayAddProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAddProjectEntity"
import { IAddProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/AddProjectEntity"
import { IEditProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/EditProjectEntity"
import { IDeleteProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DeleteProjectEntity"
import { IChangeStatusUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/ChangeStatusEntity"
import { IFetchProjectUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/FetchProjectEntity"
import { HTTP_STATUS } from "../../../../Shared/Status_code"




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


   projectData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { page, search } = req.query
      const result = await this.displayProjectUseCase.execute(Number(page), String(search))
      res.status(HTTP_STATUS.OK).json(result)
   }


   addProjectdata = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.displayAddProjectUseCase.execute()
      res.status(HTTP_STATUS.OK).json(result)
   }


   saveProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.addProjectUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.editProjectUseCase.execute({ _id: req.params.id, ...req.body })
      res.status(result.status_code).json(result)
   }


   removeProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.removeProjectUseCase.execute(req.params.id)
      res.status(result.status_code).json(result)
   }


   projectStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.changeStatusUseCase.execute({ _id: req.params.id, ...req.body })
      res.status(result.status_code).json(result)
   }


   getProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.FetchProjectUseCase.axecute()
      res.status(HTTP_STATUS.OK).json(result)
   }
}


