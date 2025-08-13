import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { IUpdateBrandUseCaseEntity } from "../../../../Entities/useCaseEntities/Brand.UseCase.Entities/UpdateBrandEntity";
import { IEditBrandControllerEntity } from "../../../../Entities/ControllerEntities/Brand.Controller.Entities/EditBrand.Controller.Entity";

export class EditBrandController implements IEditBrandControllerEntity {
    constructor(private editBrandUseCase: IUpdateBrandUseCaseEntity) { }
    async editBrandHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> {
        try {
            return await this.editBrandUseCase.execute({ _id: req.params.id, ...req.body });
        } catch (error) {
            next(error)
        }
    }
}
