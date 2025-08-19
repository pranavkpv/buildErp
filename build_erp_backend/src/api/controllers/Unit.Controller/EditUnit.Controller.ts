import { Request, Response, NextFunction } from "express";
import { IupdateUnitUseCaseEntity } from "../../../application/interfaces/Unit.Usecase.Entities/UpdateUnitEntity";
import { commonOutput } from "../../../application/dto/CommonEntities/common";
import { IEditUnitControllerEntity } from "../../../domain/Entities/ControllerEntities/Unit.Controller.Entities/EditUnit.Controller.Entity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { unitFailedMessage } from "../../../Shared/Messages/Unit.Message";

export class EditUnitController implements IEditUnitControllerEntity {
    constructor(private editUnitUseCase: IupdateUnitUseCaseEntity) { }
    editUnitHandler = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
        try {
            const { id } = req.params;
            const { unit_name, short_name } = req.body;
            if (!id || typeof id !== "string" || id.trim().length === 0) {
                return ResponseHelper.badRequest(unitFailedMessage.MISS_UNIT_ID)
            }
            if (!unit_name || typeof unit_name !== "string" || unit_name.trim() === "") {
                return ResponseHelper.badRequest(unitFailedMessage.REQUIRED_UNIT_NAME)
            }
            if (typeof short_name !== "string") {
                return ResponseHelper.badRequest(unitFailedMessage.SHORT_NAME_STRING)
            }
            return await this.editUnitUseCase.execute({ _id: req.params.id, ...req.body });
        } catch (error) {
            next(error)
        }
    }
}
