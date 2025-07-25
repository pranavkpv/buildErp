import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IFetchAllLabourUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/FetchAllLabourEntity";
import { ILabourModelEntity } from "../../../Entities/ModelEntities/Labour.Entity";

export class FetchAllLabourUseCase implements IFetchAllLabourUseCase{
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository){
      this.labourRepository = labourRepository
   }
   async execute():Promise<ILabourModelEntity[] | []>{
      const data = await this.labourRepository.fetchLabourData()
      return data 
   }
}