import { Request, Response, NextFunction } from "express";
import { ISaveBrandUseCaseEntity } from "../../../../Entities/useCaseEntities/Brand.UseCase.Entities/SaveBrandEntity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { IAddBrandControllerEntity } from "../../../../Entities/ControllerEntities/Brand.Controller.Entities/AddBrand.Controller.Entity";

export class AddBrandController implements IAddBrandControllerEntity {
    constructor(private addBrandUseCase: ISaveBrandUseCaseEntity) { }
    async addBrandHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> {
        try {
            return await this.addBrandUseCase.execute(req.body);
        } catch (error) {
            next(error)
        }
    }
}
