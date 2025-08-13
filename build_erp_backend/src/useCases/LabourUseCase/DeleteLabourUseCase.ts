import { commonOutput } from "../../DTO/CommonEntities/common"
import { IDeleteLabourUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/DeleteLabourEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { ILabourRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/ILabourRepository"
import { ISpecRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/ISpecRepository"
import { LabourFailedMessage, LabourSuccessMessage } from "../../Shared/Messages/Labour.Message"


export class DeleteLabourUseCase implements IDeleteLabourUseCaseEntity {
   private labourRepository: ILabourRepositoryEntity
   private specRepository: ISpecRepositoryEntity
   constructor(labourRepository: ILabourRepositoryEntity, specRepository: ISpecRepositoryEntity) {
      this.labourRepository = labourRepository
      this.specRepository = specRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      const existSpec = await this.specRepository.findSpecByLabourId(_id)
      if (existSpec) {
         return ResponseHelper.conflictData(LabourFailedMessage.EXIST_SPEC)
      }
      await this.labourRepository.deleteLabourById(_id)
      return ResponseHelper.success(LabourSuccessMessage.DELETE)
   }
}