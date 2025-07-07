import { NextFunction, Request, Response } from "express"
import { DisplayAllLabourUseCase } from "../../../../useCases/admin/Labour/DisplayAllLabourUseCase"
import { AddLabourUseCase } from "../../../../useCases/admin/Labour/AddLabourUseCase"
import { UpdateLabourUseCase } from "../../../../useCases/admin/Labour/UpdateLabourUseCase"
import { DeleteLabourUseCase } from "../../../../useCases/admin/Labour/DeleteLabourUseCase"
import { FetchAllLabourUseCase } from "../../../../useCases/admin/Labour/fetchAllLabourUseCase"



export class LabourController {
   private displayAllLabourUseCase: DisplayAllLabourUseCase
   private addLabourUseCase: AddLabourUseCase
   private updateLabourUseCase: UpdateLabourUseCase
   private deleteLabourUseCase: DeleteLabourUseCase
   private fetchallLabourusecase : FetchAllLabourUseCase
   constructor(displayAllLabourUseCase: DisplayAllLabourUseCase, 
      addLabourUseCase: AddLabourUseCase, updateLabourUseCase: UpdateLabourUseCase,
       deleteLabourUseCase: DeleteLabourUseCase,fetchallLabourusecase : FetchAllLabourUseCase) {
      this.addLabourUseCase = addLabourUseCase
      this.deleteLabourUseCase = deleteLabourUseCase
      this.displayAllLabourUseCase = displayAllLabourUseCase
      this.updateLabourUseCase = updateLabourUseCase
      this.fetchallLabourusecase = fetchallLabourusecase
   }
   getLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { page, search } = req.query
         const result = await this.displayAllLabourUseCase.execute(Number(page), String(search))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   saveLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addLabourUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   removeLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteLabourUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   updateLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.updateLabourUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }

   fetchlabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.fetchallLabourusecase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }



}


