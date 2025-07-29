import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { labourOutput } from "../../../Entities/Input-OutputEntities/LabourEntities/labour";
import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IFetchLabourByIdUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchLabourByIdEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchLabourByIdUseCase implements IFetchLabourByIdUsecase {
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(_id: string): Promise<labourOutput  | commonOutput> {
      try {
         const data = await this.labourRepository.findLabourById(_id)
         return {
            success:true,
            message:SUCCESS_MESSAGE.LABOUR.FETCH,
            status_code:HTTP_STATUS.OK,
            data 
         }
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}