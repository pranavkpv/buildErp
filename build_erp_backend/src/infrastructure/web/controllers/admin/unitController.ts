import { NextFunction, Request, Response } from "express"
import { DisplayAllUnitUseCase } from "../../../../useCases/admin/Unit/DisplayAllUnitUseCase"
import { SaveUnitUseCase } from "../../../../useCases/admin/Unit/SaveUnitUseCase"
import { updateUnitUseCase } from "../../../../useCases/admin/Unit/updateUnitUseCase"
import { deleteUnitUseCase } from "../../../../useCases/admin/Unit/DeleteUnitUseCase"
import { FetchUnitUseCase } from "../../../../useCases/admin/Unit/FetchUnitUseCase"




export class UnitController {
   private displayUnitUseCase: DisplayAllUnitUseCase
   private addUnitUseCase: SaveUnitUseCase
   private editUnitUseCase: updateUnitUseCase
   private deleteUnitUseCase: deleteUnitUseCase
   private fetchunitusecase : FetchUnitUseCase
   constructor(
      displayUnitUseCase: DisplayAllUnitUseCase,
      addUnitUseCase: SaveUnitUseCase,
      editUnitUseCase: updateUnitUseCase,
      deleteUnitUseCase: deleteUnitUseCase,
      fetchunitusecase : FetchUnitUseCase
   ) {
      this.displayUnitUseCase = displayUnitUseCase
      this.addUnitUseCase = addUnitUseCase
      this.editUnitUseCase = editUnitUseCase
      this.deleteUnitUseCase = deleteUnitUseCase
      this.fetchunitusecase = fetchunitusecase
   }
   getUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
          const {page,search} = req.query
         const result = await this.displayUnitUseCase.execute(Number(page),String(search))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   addUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addUnitUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   editUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.editUnitUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   removeUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteUnitUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   displayAllUnit = async(req: Request, res: Response, next: NextFunction) : Promise<void> =>{
      try {
         const result = await this.fetchunitusecase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   
}

