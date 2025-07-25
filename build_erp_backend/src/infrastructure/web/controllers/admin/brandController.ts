import { NextFunction, Request, Response } from "express"
import { IBrandControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IBrandControllerEntity"
import { IDisplayAllBrandUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/DisplayAllBrandEntity"
import { ISaveBrandUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/SaveBrandEntity"
import { IUpdateBrandUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/UpdateBrandEntity"
import { IDeleteBrandUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/DeleteBrandEntity"
import { HTTP_STATUS } from "../../../../Shared/Status_code"



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

   
   brandList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { page, search } = req.query
      const result = await this.displayBrandUseCase.execute(Number(page), String(search))
      res.status(HTTP_STATUS.OK).json(result)
   }


   addBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.addBrandUseCase.execute(req.body)
      res.status(result.status_code).json(result)
   }


   editBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.editBrandUseCase.execute({ _id: req.params.id, ...req.body })
      res.status(result.status_code).json(result)
   }


   removeBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.deleteBrandUseCase.execute(req.params.id)
      res.status(result.status_code).json(result)
   }
}





