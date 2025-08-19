import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../../application/dto/CommonEntities/common";
import { IDisplayAllUnitControllerEntity } from "../../../domain/Entities/ControllerEntities/Unit.Controller.Entities/DisplayAllUnit.Controller.Entity";
import { IFetchUnitUseCaseEntity } from "../../../application/interfaces/Unit.Usecase.Entities/FetchUnitEntity";

export class DisplayAllUnitController implements IDisplayAllUnitControllerEntity {
   private fetchUnitUsecasedata : IFetchUnitUseCaseEntity
   constructor(fetchUnitUsecasedata : IFetchUnitUseCaseEntity){
      this.fetchUnitUsecasedata = fetchUnitUsecasedata
   }
   displayAllUnitHandler = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      try {
         const data = await this.fetchUnitUsecasedata.execute()
         return data
      } catch (error) {
         next(error)
      }
   }
}
