import { commonOutput } from "../../DTO/CommonEntities/common"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { IUnitRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IUnitRepository"
import { ISaveUnitUseCaseEntity } from "../../Entities/useCaseEntities/Unit.Usecase.Entities/SaveUnitEntity"
import { inputUnit } from "../../DTO/UnitEntities/Unit.Entity"
import { unitFailedMessage, unitSuccessMessage } from "../../Shared/Messages/Unit.Message"


export class SaveUnitUseCase implements ISaveUnitUseCaseEntity {
   private UnitRepository: IUnitRepositoryEntity
   constructor(UnitRepository: IUnitRepositoryEntity) {
      this.UnitRepository = UnitRepository
   }
   async execute(input: inputUnit): Promise<commonOutput> {
      const { unit_name, short_name } = input
      const ExistUnit = await this.UnitRepository.findUnitByunit_name({ unit_name })
      if (ExistUnit) {
         return ResponseHelper.conflictData(unitFailedMessage.EXIST)
      }
      const response = await this.UnitRepository.saveUnit({ unit_name, short_name })
      if (!response) throw new Error(unitFailedMessage.FAILED_SAVE)
      return ResponseHelper.success(unitSuccessMessage.ADD)
   }
}