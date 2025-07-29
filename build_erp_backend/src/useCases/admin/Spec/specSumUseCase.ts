import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { mixMatAndLabour, specOutput } from "../../../Entities/Input-OutputEntities/EstimationEntities/specification";
import { ISpecSumUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecSumEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";




export class SpecSumUseCase implements ISpecSumUseCase {
   private materialRepository: IMaterialRepository
   private labourRepository: ILabourRepository
   constructor(materialRepository: IMaterialRepository, labourRepository: ILabourRepository) {
      this.materialRepository = materialRepository
      this.labourRepository = labourRepository
   }
   async execute(input: mixMatAndLabour): Promise<specOutput | commonOutput> {
      try {
         const { materialDetails, labourDetails } = input
         let sumofMaterial = 0
         let sumOfLabour = 0
         for (let element of materialDetails) {
            const material = await this.materialRepository.findMaterialById(element.material_id)
            if (material) {
               sumofMaterial += (material?.unit_rate * element.quantity)
            }
         }
         for (let element of labourDetails) {
            const labour = await this.labourRepository.findLabourById(element.labour_id)
            if (labour) {
               sumOfLabour += (labour.daily_wage * element.numberoflabour)
            }

         }
         return {
            success:true,
            message:SUCCESS_MESSAGE.SPEC.FETCH_UNITRATE,
            status_code:HTTP_STATUS.OK,
            data:sumofMaterial + sumOfLabour
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}