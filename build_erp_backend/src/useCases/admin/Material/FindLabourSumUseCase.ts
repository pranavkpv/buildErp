//here find the sum of labour with labour_id,number of labour in estimation

import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IFindlabourSumUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindLabourSumEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FindlabourSumUsecase implements IFindlabourSumUsecase{
   private labourRepository:ILabourRepository
   constructor(labourRepository:ILabourRepository){
      this.labourRepository = labourRepository
   }
   async execute(labours:{ labour_id: string, numberoflabour: number }[]):Promise<number | commonOutput>{
     try {
      const sum = await this.labourRepository.findSumofLabouor(labours)
     return sum
     } catch (error:any) {
      return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
     }
   }
}