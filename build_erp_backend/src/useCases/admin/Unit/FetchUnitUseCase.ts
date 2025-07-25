
import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository";
import { IFetchUnitUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/FetchUnitEntity";
import { IUnitModelEntity } from "../../../Entities/ModelEntities/Unit.Entity";

export class FetchUnitUseCase implements IFetchUnitUseCase {
   private unitRepository : IUnitRepository
   constructor(unitRepository : IUnitRepository){
      this.unitRepository = unitRepository
   }
   async execute():Promise<IUnitModelEntity[] | []>{
      const result = await this.unitRepository.findUnit()
      return result 
   }
}