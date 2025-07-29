import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IFetchAllLabourUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchAllLabourEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { labourOutput } from "../../../Entities/Input-OutputEntities/LabourEntities/labour";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";

export class FetchAllLabourUseCase implements IFetchAllLabourUseCase {
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(): Promise<labourOutput | commonOutput> {
      try {
         const data = await this.labourRepository.fetchLabourData()
         return {
            success:true,
            message:SUCCESS_MESSAGE.LABOUR.FETCH,
            status_code:HTTP_STATUS.OK,
            data,
         }
      } catch (error:any) {
          return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}