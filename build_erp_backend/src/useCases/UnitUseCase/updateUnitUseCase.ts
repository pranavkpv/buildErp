import { commonOutput } from "../../DTO/CommonEntities/common"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { IUnitRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IUnitRepository"
import { inputUnit } from "../../DTO/UnitEntities/Unit.Entity"
import { unitFailedMessage, unitSuccessMessage } from "../../Shared/Messages/Unit.Message"
import { IupdateUnitUseCaseEntity } from "../../Entities/useCaseEntities/Unit.Usecase.Entities/UpdateUnitEntity"


export class updateUnitUseCase implements IupdateUnitUseCaseEntity {
   private UnitRepository: IUnitRepositoryEntity
   constructor(UnitRepository: IUnitRepositoryEntity) {
      this.UnitRepository = UnitRepository
   }
   async execute(input: inputUnit): Promise<commonOutput> {
      const { _id, unit_name, short_name } = input
      if (!_id) throw new Error(unitFailedMessage.MISS_UNIT_ID)
      const findUnit = await this.UnitRepository.findUnitById(_id)
      if (findUnit) return ResponseHelper.badRequest(unitFailedMessage.NOT_EXIST)
      const existUnit = await this.UnitRepository.findUnitInEdit({ _id, unit_name })
      if (existUnit) return ResponseHelper.conflictData(unitFailedMessage.EXIST)
      const response = await this.UnitRepository.updateUnitById({ _id, unit_name, short_name })
      if (!response) throw new Error(unitFailedMessage.FAILED_UPDATE)
      return ResponseHelper.success(unitSuccessMessage.UPDATE)
   }
}