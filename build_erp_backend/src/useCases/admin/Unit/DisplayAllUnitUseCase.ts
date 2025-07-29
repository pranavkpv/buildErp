import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { UnitOutput } from "../../../Entities/Input-OutputEntities/MaterialEntities/unit";
import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository";
import { IDisplayAllUnitUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/DisplayAllUnitEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";




export class DisplayAllUnitUseCase implements IDisplayAllUnitUseCase {
   private UnitRepository: IUnitRepository
   constructor(UnitRepository: IUnitRepository) {
      this.UnitRepository = UnitRepository
   }
   async execute(page: number, search: string): Promise<UnitOutput | commonOutput> {
      try {
         const { data, totalPage } = await this.UnitRepository.findAllListUnit(page, search)
         return {
            success: true,
            message: SUCCESS_MESSAGE.UNIT.FETCH,
            status_code: HTTP_STATUS.OK,
            data,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}










