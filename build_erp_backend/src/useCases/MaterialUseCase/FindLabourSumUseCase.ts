import { commonOutput } from "../../DTO/CommonEntities/common";
import { specOutput } from "../../DTO/EstimationEntities/specification";
import { ILabourRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IFindlabourSumUsecaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindLabourSumEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { MaterialSuccessMessage } from "../../Shared/Messages/Material.Message";

export class FindlabourSumUsecase implements IFindlabourSumUsecaseEntity {
   private labourRepository: ILabourRepositoryEntity
   constructor(labourRepository: ILabourRepositoryEntity) {
      this.labourRepository = labourRepository
   }
   async execute(labours: { labour_id: string, numberoflabour: number }[]): Promise<specOutput | commonOutput> {

      const sum = await this.labourRepository.findSumofLabouor(labours)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH_LABOUR_SUM, sum)
   }
}