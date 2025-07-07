import { NextFunction, Request, Response } from "express"
import { DisplayAllBrandUseCase } from "../../../../useCases/admin/Brand/DisplayAllBrandUseCase"
import { SaveBrandUseCase } from "../../../../useCases/admin/Brand/SaveBrandUseCase"
import { UpdateBrandUseCase } from "../../../../useCases/admin/Brand/UpdateBrandUseCase"
import { DeleteBrandUseCase } from "../../../../useCases/admin/Brand/DeleteBrandUseCase"



export class brandController {
   private displayBrandUseCase: DisplayAllBrandUseCase
   private addBrandUseCase: SaveBrandUseCase
   private editBrandUseCase: UpdateBrandUseCase
   private deleteBrandUseCase: DeleteBrandUseCase
   constructor(displayBrandUseCase: DisplayAllBrandUseCase, addBrandUseCase: SaveBrandUseCase, editBrandUseCase: UpdateBrandUseCase, deleteBrandUseCase: DeleteBrandUseCase) {
      this.displayBrandUseCase = displayBrandUseCase
      this.addBrandUseCase = addBrandUseCase
      this.editBrandUseCase = editBrandUseCase
      this.deleteBrandUseCase = deleteBrandUseCase
   }
   brandList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
          const {page,search} = req.query
         const result = await this.displayBrandUseCase.execute(Number(page),String(search))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   addBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addBrandUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   editBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.editBrandUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
    removeBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteBrandUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
}





