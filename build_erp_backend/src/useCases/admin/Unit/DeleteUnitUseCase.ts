import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IdeleteUnitUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/DeleteUnitEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class deleteUnitUseCase implements IdeleteUnitUseCase {
   private UnitRepository: IUnitRepository
   private MaterialRepository: IMaterialRepository
   constructor(UnitRepository: IUnitRepository, MaterialRepository: IMaterialRepository) {
      this.UnitRepository = UnitRepository
      this.MaterialRepository = MaterialRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      try {
         const existUnit = await this.MaterialRepository.findMaterialByUnitId(_id)
         if (existUnit) {
            return ResponseHelper.failure(ERROR_MESSAGE.UNIT.USED, HTTP_STATUS.CONFLICT)
         }
         await this.UnitRepository.deleteUnitById(_id)
         return ResponseHelper.success(SUCCESS_MESSAGE.UNIT.DELETE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}