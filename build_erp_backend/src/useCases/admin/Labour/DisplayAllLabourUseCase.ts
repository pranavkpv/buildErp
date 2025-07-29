import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { labourOutput } from "../../../Entities/Input-OutputEntities/LabourEntities/labour";
import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IDisplayAllLabourUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/DisplayAllLoabourEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";



export class DisplayAllLabourUseCase implements IDisplayAllLabourUsecase {
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(page: number, search: string): Promise<labourOutput | commonOutput> {
      try {
         const { data , totalPage } = await this.labourRepository.findAllLabour(page, search)
         return {
            success:true,
            message:SUCCESS_MESSAGE.LABOUR.FETCH,
            status_code:HTTP_STATUS.OK,
            data,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}



