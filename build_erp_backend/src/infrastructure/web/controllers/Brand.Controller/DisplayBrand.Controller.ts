import { Request, Response, NextFunction } from "express";
import { IDisplayAllBrandUseCaseEntity } from "../../../../Entities/useCaseEntities/Brand.UseCase.Entities/DisplayAllBrandEntity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { IBrandListControllerEntity } from "../../../../Entities/ControllerEntities/Brand.Controller.Entities/BrandList.Controller.Entity";

export class DisplayBrandController implements IBrandListControllerEntity {
   constructor(private displayBrandUseCase: IDisplayAllBrandUseCaseEntity) { }
    brandListHandler = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> =>{
      try {
         const { page, search } = req.query;
         return await this.displayBrandUseCase.execute({page:Number(page), search:String(search)});
      } catch (error) {
         next(error)
      }
   }
}
