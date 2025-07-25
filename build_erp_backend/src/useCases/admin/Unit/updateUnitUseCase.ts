
import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository"
import { editUnitInput } from "../../../Entities/Input-OutputEntities/MaterialEntities/unit"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IupdateUnitUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/UpdateUnitEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class updateUnitUseCase implements IupdateUnitUseCase {
   private UnitRepository: IUnitRepository
   constructor(UnitRepository: IUnitRepository) {
      this.UnitRepository = UnitRepository
   }
   async execute(input: editUnitInput): Promise<commonOutput> {
      const { _id, unit_name, short_name } = input
      const existUnit = await this.UnitRepository.findUnitInEdit(_id, unit_name)
      if (existUnit) {
         return ResponseHelper.failure(ERROR_MESSAGE.UNIT.EXIST,HTTP_STATUS.CONFLICT)
      } else {
         await this.UnitRepository.updateUnitById(_id, unit_name, short_name)
         return ResponseHelper.success(SUCCESS_MESSAGE.UNIT.UPDATE,HTTP_STATUS.OK)
      }
   }
}