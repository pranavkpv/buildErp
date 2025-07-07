import { NextFunction, Request, Response } from "express"
import { DisplayAllProjectUseCase } from "../../../../useCases/admin/Project/DisplayAllProjectUseCase"
import { DisplayAddProjectUseCase } from "../../../../useCases/admin/Project/DisplayAddProjectUseCase"
import { AddProjectUseCase } from "../../../../useCases/admin/Project/AddProjectUseCase"
import { EditProjectUseCase } from "../../../../useCases/admin/Project/EditProjectUseCase"
import { DeleteProjectUseCase } from "../../../../useCases/admin/Project/DeleteProjectUseCase"
import { ChangeStatusUseCase } from "../../../../useCases/admin/Project/ChangeStatusUseCase"
import { FetchProjectUseCase } from "../../../../useCases/admin/Project/fetchProjectUseCase"




export class ProjectController {
   private displayProjectUseCase: DisplayAllProjectUseCase
   private displayAddProjectUseCase: DisplayAddProjectUseCase
   private addProjectUseCase: AddProjectUseCase
   private editProjectUseCase: EditProjectUseCase
   private removeProjectUseCase: DeleteProjectUseCase
   private changeStatusUseCase: ChangeStatusUseCase
   private FetchProjectUseCase:FetchProjectUseCase
   constructor(
      displayProjectUseCase: DisplayAllProjectUseCase,
      displayAddProjectUseCase: DisplayAddProjectUseCase,
      addProjectUseCase: AddProjectUseCase,
      editProjectUseCase: EditProjectUseCase,
      removeProjectUseCase: DeleteProjectUseCase,
      changeStatusUseCase: ChangeStatusUseCase,
      FetchProjectUseCase:FetchProjectUseCase
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
      try {
         const {page,search} = req.query
         const result = await this.displayProjectUseCase.execute(Number(page),String(search))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   addProjectdata = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.displayAddProjectUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   saveProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addProjectUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.editProjectUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   removeProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.removeProjectUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   projectStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.changeStatusUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }

   getProject = async(req: Request, res: Response, next: NextFunction): Promise<void> =>{
      try {
         const result = await this.FetchProjectUseCase.axecute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }



}


