import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository"
import { ISpecRepository } from "../../../Entities/repositoryEntities/Estimation-management/ISpecRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IDeleteLabourUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/DeleteLabourEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { error } from "console"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class DeleteLabourUseCase implements IDeleteLabourUseCase {
   private labourRepository: ILabourRepository
   private specRepository: ISpecRepository
   constructor(labourRepository: ILabourRepository, specRepository: ISpecRepository) {
      this.labourRepository = labourRepository
      this.specRepository = specRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      const existSpec = await this.specRepository.findSpecByLabourId(_id)
      if (existSpec) {
         return ResponseHelper.failure(ERROR_MESSAGE.LABOUR.EXIST_SPEC, HTTP_STATUS.CONFLICT)
      }
      await this.labourRepository.deleteLabourById(_id)
      return ResponseHelper.success(SUCCESS_MESSAGE.LABOUR.DELETE, HTTP_STATUS.OK)
   }
}