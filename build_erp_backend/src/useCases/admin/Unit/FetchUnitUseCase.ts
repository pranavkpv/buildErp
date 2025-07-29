
import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository";
import { IFetchUnitUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/FetchUnitEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { UnitOutput } from "../../../Entities/Input-OutputEntities/MaterialEntities/unit";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";

export class FetchUnitUseCase implements IFetchUnitUseCase {
   private unitRepository: IUnitRepository
   constructor(unitRepository: IUnitRepository) {
      this.unitRepository = unitRepository
   }
   async execute(): Promise<UnitOutput | [] | commonOutput> {
      try {
         const result = await this.unitRepository.findUnit()
         return {
            success:true,
            message:SUCCESS_MESSAGE.UNIT.FETCH,
            status_code:HTTP_STATUS.OK,
            data:result
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}