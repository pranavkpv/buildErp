import { commonOutput } from "../../DTO/CommonEntities/common";
import { labourOutput } from "../../DTO/LabourEntities/labour";
import { ILabourRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IDisplayAllLabourUsecaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/DisplayAllLoabourEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { LabourSuccessMessage } from "../../Shared/Messages/Labour.Message";



export class DisplayAllLabourUseCase implements IDisplayAllLabourUsecaseEntity {
   private labourRepository: ILabourRepositoryEntity
   constructor(labourRepository: ILabourRepositoryEntity) {
      this.labourRepository = labourRepository
   }
   async execute(page: number, search: string): Promise<labourOutput | commonOutput> {
      const { data, totalPage } = await this.labourRepository.findAllLabour({ page, search })
      return ResponseHelper.success(LabourSuccessMessage.FETCH, data, totalPage)
   }
}



