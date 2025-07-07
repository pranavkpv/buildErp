import { IUnitRepository } from "../../../domain/repositories/IUnitRepository";
import { Unit } from "../../../domain/types/unit";

export class FetchUnitUseCase{
   private unitRepository : IUnitRepository
   constructor(unitRepository : IUnitRepository){
      this.unitRepository = unitRepository
   }
   async execute():Promise<Unit [] | []>{
      const result = await this.unitRepository.findUnit()
      return result ? result : []
   }
}