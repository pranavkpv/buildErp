import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../../application/dto/CommonEntities/common";
import { IDeleteBrandUsecaseEntity } from "../../../application/interfaces/useCase.Entity/Brand.UseCase.Entities/DeleteBrandEntity";
import { IRemoveBrandControllerEntity } from "../../../domain/Entities/ControllerEntities/Brand.Controller.Entities/DeleteBrand.Controller.Entity";

export class DeleteBrandController implements IRemoveBrandControllerEntity {
   constructor(private deleteBrandUseCase: IDeleteBrandUsecaseEntity) { }
    removeBrandHandler = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      return await this.deleteBrandUseCase.execute(req.params.id);
   }
}
