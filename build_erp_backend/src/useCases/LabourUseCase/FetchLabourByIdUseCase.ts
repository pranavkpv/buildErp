import { commonOutput } from "../../DTO/CommonEntities/common";
import { labourOutput } from "../../DTO/LabourEntities/labour";
import { IFetchLabourByIdUsecaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchLabourByIdEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ILabourRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { LabourSuccessMessage } from "../../Shared/Messages/Labour.Message";

export class FetchLabourByIdUseCase implements IFetchLabourByIdUsecaseEntity {
   private labourRepository: ILabourRepositoryEntity
   constructor(labourRepository: ILabourRepositoryEntity) {
      this.labourRepository = labourRepository
   }
   async execute(_id: string): Promise<labourOutput | commonOutput> {
      const data = await this.labourRepository.findLabourById(_id)
      return ResponseHelper.success(LabourSuccessMessage.FETCH,data)
   }
}