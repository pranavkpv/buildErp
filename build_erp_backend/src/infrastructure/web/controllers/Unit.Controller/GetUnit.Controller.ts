import { Request, Response, NextFunction } from "express";
import { IDisplayAllUnitUseCaseEntity } from "../../../../Entities/useCaseEntities/Unit.Usecase.Entities/DisplayAllUnitEntity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { IGetUnitControllerEntity } from "../../../../Entities/ControllerEntities/Unit.Controller.Entities/GetUnit.Controller.Entity";
import { ResponseHelper } from "../../../../Shared/ResponseHelper/response";
import { commonFailedMessage } from "../../../../Shared/Messages/Common.Message";

export class GetUnitController implements IGetUnitControllerEntity {
    constructor(private displayUnitUseCase: IDisplayAllUnitUseCaseEntity) { }
    async getUnitHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> {
        try {
            const { page, search } = req.query
            // Convert page to number and validate
            const pageNum = Number(page);
            if (isNaN(pageNum) || pageNum <= 0) {
                return ResponseHelper.badRequest(commonFailedMessage.PAGE_NEGATIVE)
            }
            //  limit search query length
            if (search && String(search).length > 50) {
                return ResponseHelper.badRequest(commonFailedMessage.SEARCH_LIMIT)
            }
            return await this.displayUnitUseCase.execute(Number(page), String(search));
        } catch (error) {
            next(error)
        }
    }
}
