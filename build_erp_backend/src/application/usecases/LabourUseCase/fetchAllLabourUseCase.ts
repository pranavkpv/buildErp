import { IFetchAllLabourUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/LabourUseCaseEntities/FetchAllLabourEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/CommonEntities/common";
import { labourOutput } from "../../dto/LabourEntities/labour";
import { ILabourRepositoryEntity } from "../../../domain/interfaces/Labour-management/ILabourRepository";
import { LabourSuccessMessage } from "../../../Shared/Messages/Labour.Message";

export class FetchAllLabourUseCase implements IFetchAllLabourUseCaseEntity {
   private labourRepository: ILabourRepositoryEntity
   constructor(labourRepository: ILabourRepositoryEntity) {
      this.labourRepository = labourRepository
   }
   async execute(): Promise<labourOutput | commonOutput> {
      const data = await this.labourRepository.fetchLabourData()
      return ResponseHelper.success(LabourSuccessMessage.FETCH, data)
   }
}