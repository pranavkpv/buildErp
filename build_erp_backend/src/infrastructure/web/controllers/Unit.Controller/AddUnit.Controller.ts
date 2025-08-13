import { Request, Response, NextFunction } from "express";
import { ISaveUnitUseCaseEntity } from "../../../../Entities/useCaseEntities/Unit.Usecase.Entities/SaveUnitEntity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { IAddUnitControllerEntity } from "../../../../Entities/ControllerEntities/Unit.Controller.Entities/AddUnit.Controller.Entity";
import { ResponseHelper } from "../../../../Shared/ResponseHelper/response";
import { unitFailedMessage } from "../../../../Shared/Messages/Unit.Message";

export class AddUnitController implements IAddUnitControllerEntity {
    constructor(private addUnitUseCase: ISaveUnitUseCaseEntity) { }
    async addUnitHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> {
        try {
            const { unit_name, short_name } = req.body
            if (!unit_name || typeof unit_name !== "string" || unit_name.trim() === "") {
                return ResponseHelper.badRequest(unitFailedMessage.REQUIRED_UNIT_NAME)
            }

            if (typeof short_name !== "string") {
                return ResponseHelper.badRequest(unitFailedMessage.SHORT_NAME_STRING)
            }
            return await this.addUnitUseCase.execute(req.body);
        } catch (error) {
            next(error)
        }
    }
}
