import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../../application/dto/CommonEntities/common";
import { IUpdateBrandUseCaseEntity } from "../../../application/interfaces/useCase.Entity/Brand.UseCase.Entities/UpdateBrandEntity";
import { IEditBrandControllerEntity } from "../../../domain/Entities/ControllerEntities/Brand.Controller.Entities/EditBrand.Controller.Entity";

export class EditBrandController implements IEditBrandControllerEntity {
    constructor(private editBrandUseCase: IUpdateBrandUseCaseEntity) { }
     editBrandHandler = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
        try {
            return await this.editBrandUseCase.execute({ _id: req.params.id, ...req.body });
        } catch (error) {
            next(error)
        }
    }
}
