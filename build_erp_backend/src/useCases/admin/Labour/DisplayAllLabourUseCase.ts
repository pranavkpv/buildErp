import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IDisplayAllLabourUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/DisplayAllLoabourEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";



export class DisplayAllLabourUseCase implements IDisplayAllLabourUsecase {
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(page: number, search: string): Promise<{ getLabourData: any[]; totalPage: number } | commonOutput> {
      try {
         const { getLabourData, totalPage } = await this.labourRepository.findAllLabour(page, search)
         return {
            getLabourData,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}



