import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository";
import { IDisplayAllUnitUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/DisplayAllUnitEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";




export class DisplayAllUnitUseCase implements IDisplayAllUnitUseCase {
   private UnitRepository: IUnitRepository
   constructor(UnitRepository: IUnitRepository) {
      this.UnitRepository = UnitRepository
   }
   async execute(page: number, search: string): Promise<{ getUnitData: any[]; totalPage: number } | commonOutput> {
      try {
         const { getUnitData, totalPage } = await this.UnitRepository.findAllListUnit(page, search)
         return {
            getUnitData,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}










