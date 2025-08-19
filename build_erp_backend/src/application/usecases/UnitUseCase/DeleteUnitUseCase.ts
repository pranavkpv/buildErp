import { commonOutput } from "../../dto/CommonEntities/common"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IdeleteUnitUseCaseEntity } from "../../interfaces/Unit.Usecase.Entities/DeleteUnitEntity"
import { IUnitRepositoryEntity } from "../../../domain/interfaces/Material-management/IUnitRepository"
import { unitFailedMessage, unitSuccessMessage } from "../../../Shared/Messages/Unit.Message"
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository"


export class deleteUnitUseCase implements IdeleteUnitUseCaseEntity {
   private UnitRepository: IUnitRepositoryEntity
   private MaterialRepository: IMaterialRepositoryEntity
   constructor(UnitRepository: IUnitRepositoryEntity, MaterialRepository: IMaterialRepositoryEntity) {
      this.UnitRepository = UnitRepository
      this.MaterialRepository = MaterialRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      const findUnit = await this.UnitRepository.findUnitById(_id)
      if (findUnit) return ResponseHelper.badRequest(unitFailedMessage.NOT_EXIST)
      const existUnit = await this.MaterialRepository.findMaterialByUnitId(_id)
      if (existUnit) return ResponseHelper.conflictData(unitFailedMessage.USED)
      const response = await this.UnitRepository.deleteUnitById(_id)
      if (!response) throw new Error(unitFailedMessage.FAILED_DELETE)
      return ResponseHelper.success(unitSuccessMessage.DELETE)
   }
}