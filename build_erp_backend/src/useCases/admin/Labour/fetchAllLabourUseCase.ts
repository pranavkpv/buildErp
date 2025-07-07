import { ILabourRepository } from "../../../domain/repositories/ILabourRepository";
import { Labour } from "../../../domain/types/labour";

export class FetchAllLabourUseCase{
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository){
      this.labourRepository = labourRepository
   }
   async execute():Promise<Labour[] | []>{
      const data = await this.labourRepository.fetchLabourData()
      return data ? data : []
   }
}