import { Request, Response, NextFunction } from "express";
import { ISaveBrandUseCaseEntity } from "../../../application/interfaces/useCase.Entity/Brand.UseCase.Entities/SaveBrandEntity";
import { commonOutput } from "../../../application/dto/CommonEntities/common";
import { IAddBrandControllerEntity } from "../../../domain/Entities/ControllerEntities/Brand.Controller.Entities/AddBrand.Controller.Entity";

export class AddBrandController implements IAddBrandControllerEntity {
    constructor(private addBrandUseCase: ISaveBrandUseCaseEntity) { }
     addBrandHandler = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>=> {
        try {
            return await this.addBrandUseCase.execute(req.body);
        } catch (error) {
            next(error)
        }
    }
}
