import { ILabourModelEntity } from "../../../Entities/ModelEntities/Labour.Entity";
import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IFetchLabourByIdUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchLabourByIdEntity";

export class FetchLabourByIdUseCase implements IFetchLabourByIdUsecase {
   private labourRepository : ILabourRepository
   constructor(labourRepository : ILabourRepository){
      this.labourRepository = labourRepository
   }
   async execute(_id: string): Promise<ILabourModelEntity | null> {
       const labourData = await this.labourRepository.findLabourById(_id)
       return labourData ? labourData : null
   }
}