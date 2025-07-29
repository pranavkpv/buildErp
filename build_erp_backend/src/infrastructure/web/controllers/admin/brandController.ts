import { NextFunction, Request, Response } from "express"
import { IBrandControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IBrandControllerEntity"
import { IDisplayAllBrandUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/DisplayAllBrandEntity"
import { ISaveBrandUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/SaveBrandEntity"
import { IUpdateBrandUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/UpdateBrandEntity"
import { IDeleteBrandUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/DeleteBrandEntity"
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common"
import { brandOutput } from "../../../../Entities/Input-OutputEntities/MaterialEntities/brand"




export class BrandController implements IBrandControllerEntity {
   private displayBrandUseCase: IDisplayAllBrandUseCase
   private addBrandUseCase: ISaveBrandUseCase
   private editBrandUseCase: IUpdateBrandUseCase
   private deleteBrandUseCase: IDeleteBrandUsecase
   constructor(displayBrandUseCase: IDisplayAllBrandUseCase, addBrandUseCase: ISaveBrandUseCase,
      editBrandUseCase: IUpdateBrandUseCase, deleteBrandUseCase: IDeleteBrandUsecase) {
      this.displayBrandUseCase = displayBrandUseCase
      this.addBrandUseCase = addBrandUseCase
      this.editBrandUseCase = editBrandUseCase
      this.deleteBrandUseCase = deleteBrandUseCase
   }

   //------------------------------------ List brand data with search and pagination ------------------------------------//

   brandList = async (req: Request, res: Response, next: NextFunction): Promise<brandOutput | commonOutput> => {
      const { page, search } = req.query
      const result = await this.displayBrandUseCase.execute(Number(page), String(search))
      return result
   }


   //------------------------------------ Save brand ------------------------------------//

   addBrand = async (req: Request, res: Response, next: NextFunction):Promise<commonOutput> => {
      const result = await this.addBrandUseCase.execute(req.body)
      return result
   }

 
   //------------------------------------ Update brand  ------------------------------------//

   editBrand = async (req: Request, res: Response, next: NextFunction):  Promise<commonOutput> => {
      const result = await this.editBrandUseCase.execute({ _id: req.params.id, ...req.body })
      return result
   }


   //------------------------------------ Delete brand ------------------------------------//

   removeBrand = async (req: Request, res: Response, next: NextFunction):  Promise<commonOutput> => {
      const result = await this.deleteBrandUseCase.execute(req.params.id)
      return result
   }
}





