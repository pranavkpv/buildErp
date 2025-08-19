import { commonOutput } from "../../dto/CommonEntities/common";
import { labourOutput } from "../../dto/LabourEntities/labour";
import { IFetchLabourByIdUsecaseEntity } from "../../interfaces/AdminUseCaseEntities/LabourUseCaseEntities/FetchLabourByIdEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ILabourRepositoryEntity } from "../../../domain/interfaces/Labour-management/ILabourRepository";
import { LabourSuccessMessage } from "../../../Shared/Messages/Labour.Message";

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