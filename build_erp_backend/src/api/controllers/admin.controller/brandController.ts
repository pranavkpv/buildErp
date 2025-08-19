import { NextFunction, Request, Response } from "express"
import { IBrandControllerEntity } from "../../../domain/Entities/ControllerEntities/AdminControllerEntities/IBrandControllerEntity"
import { commonOutput } from "../../../application/dto/CommonEntities/common"
import { IDisplayAllBrandUseCaseEntity } from "../../../application/interfaces/useCase.Entity/Brand.UseCase.Entities/DisplayAllBrandEntity"
import { ISaveBrandUseCaseEntity } from "../../../application/interfaces/useCase.Entity/Brand.UseCase.Entities/SaveBrandEntity"
import { IUpdateBrandUseCaseEntity } from "../../../application/interfaces/useCase.Entity/Brand.UseCase.Entities/UpdateBrandEntity"
import { IDeleteBrandUsecaseEntity } from "../../../application/interfaces/useCase.Entity/Brand.UseCase.Entities/DeleteBrandEntity"




export class BrandController implements IBrandControllerEntity {

   constructor(private displayBrandUseCase: IDisplayAllBrandUseCaseEntity,
      private addBrandUseCase: ISaveBrandUseCaseEntity,
      private editBrandUseCase: IUpdateBrandUseCaseEntity,
      private deleteBrandUseCase: IDeleteBrandUsecaseEntity) { }

   //------------------------------------ List brand data with search and pagination ------------------------------------//

   brandList = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      const { page, search } = req.query
      const result = await this.displayBrandUseCase.execute({page:Number(page),search: String(search)})
      return result
   }


   //------------------------------------ Save brand ------------------------------------//

   addBrand = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.addBrandUseCase.execute(req.body)
      return result
   }


   //------------------------------------ Update brand  ------------------------------------//

   editBrand = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.editBrandUseCase.execute({ _id: req.params.id, ...req.body })
      return result
   }


   //------------------------------------ Delete brand ------------------------------------//

   removeBrand = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.deleteBrandUseCase.execute(req.params.id)
      return result
   }
}





