
import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository";
import { IFetchUnitUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/FetchUnitEntity";
import { IUnitModelEntity } from "../../../Entities/ModelEntities/Unit.Entity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";

export class FetchUnitUseCase implements IFetchUnitUseCase {
   private unitRepository: IUnitRepository
   constructor(unitRepository: IUnitRepository) {
      this.unitRepository = unitRepository
   }
   async execute(): Promise<IUnitModelEntity[] | [] | commonOutput> {
      try {
         const result = await this.unitRepository.findUnit()
         return result
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}