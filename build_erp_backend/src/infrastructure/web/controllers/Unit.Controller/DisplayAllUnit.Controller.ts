import { Request, Response, NextFunction } from "express";
import { IFetchUnitUseCaseEntity } from "../../../../Entities/useCaseEntities/Unit.Usecase.Entities/FetchUnitEntity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { IDisplayAllUnitControllerEntity } from "../../../../Entities/ControllerEntities/Unit.Controller.Entities/DisplayAllUnit.Controller.Entity";

export class DisplayAllUnitController implements IDisplayAllUnitControllerEntity {
   constructor(private fetchUnitUseCase: IFetchUnitUseCaseEntity) { }
   async displayAllUnitHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> {
      try {
         return await this.fetchUnitUseCase.execute();
      } catch (error) {
         next(error)
      }
   }
}
