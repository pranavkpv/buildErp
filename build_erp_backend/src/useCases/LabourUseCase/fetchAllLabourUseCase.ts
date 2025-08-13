import { IFetchAllLabourUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchAllLabourEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { labourOutput } from "../../DTO/LabourEntities/labour";
import { ILabourRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { LabourSuccessMessage } from "../../Shared/Messages/Labour.Message";

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