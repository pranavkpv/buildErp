import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IFetchAllLabourUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchAllLabourEntity";
import { ILabourModelEntity } from "../../../Entities/ModelEntities/Labour.Entity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";

export class FetchAllLabourUseCase implements IFetchAllLabourUseCase {
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(): Promise<ILabourModelEntity[] | [] | commonOutput> {
      try {
         const data = await this.labourRepository.fetchLabourData()
         return data
      } catch (error:any) {
          return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}