import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ILabourModelEntity } from "../../../Entities/ModelEntities/Labour.Entity";
import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IFetchLabourByIdUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchLabourByIdEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchLabourByIdUseCase implements IFetchLabourByIdUsecase {
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(_id: string): Promise<ILabourModelEntity | null | commonOutput> {
      try {
         const labourData = await this.labourRepository.findLabourById(_id)
         return labourData ? labourData : null
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}