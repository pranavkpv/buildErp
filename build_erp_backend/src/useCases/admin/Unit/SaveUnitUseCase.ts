
import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository"
import { addUnitInput } from "../../../Entities/Input-OutputEntities/MaterialEntities/unit"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { ISaveUnitUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/SaveUnitEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class SaveUnitUseCase implements ISaveUnitUseCase {
   private UnitRepository: IUnitRepository
   constructor(UnitRepository: IUnitRepository) {
      this.UnitRepository = UnitRepository
   }
   async execute(input: addUnitInput): Promise<commonOutput> {
      try {
         const { unit_name, short_name } = input
      const ExistUnit = await this.UnitRepository.findUnitByunit_name(unit_name)
      if (ExistUnit) {
         return ResponseHelper.failure(ERROR_MESSAGE.UNIT.EXIST, HTTP_STATUS.CONFLICT)
      }
      await this.UnitRepository.saveUnit(unit_name, short_name)
      return ResponseHelper.success(SUCCESS_MESSAGE.UNIT.ADD, HTTP_STATUS.CREATED)
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}