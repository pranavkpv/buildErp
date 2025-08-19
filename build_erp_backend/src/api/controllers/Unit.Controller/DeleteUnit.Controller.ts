import { Request, Response, NextFunction } from "express";
import { IdeleteUnitUseCaseEntity } from "../../../application/interfaces/Unit.Usecase.Entities/DeleteUnitEntity";
import { commonOutput } from "../../../application/dto/CommonEntities/common";
import { IDeleteUnitControllerEntity } from "../../../domain/Entities/ControllerEntities/Unit.Controller.Entities/DeleteUnit.Controller.Entity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { unitFailedMessage } from "../../../Shared/Messages/Unit.Message";

export class DeleteUnitController implements IDeleteUnitControllerEntity {
   constructor(private deleteUnitUseCase: IdeleteUnitUseCaseEntity) { }
   removeUnitHandler = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      try {
         const { id } = req.params;
         if (!id || typeof id !== "string" || id.trim().length === 0) {
            return ResponseHelper.badRequest(unitFailedMessage.MISS_UNIT_ID)
         }
         return await this.deleteUnitUseCase.execute(req.params.id);
      } catch (error) {
         next(error)
      }
   }
}
