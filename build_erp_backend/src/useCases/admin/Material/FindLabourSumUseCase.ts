//here find the sum of labour with labour_id,number of labour in estimation

import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IFindlabourSumUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindLabourSumEntity";

export class FindlabourSumUsecase implements IFindlabourSumUsecase{
   private labourRepository:ILabourRepository
   constructor(labourRepository:ILabourRepository){
      this.labourRepository = labourRepository
   }
   async execute(labours:{ labour_id: string, numberoflabour: number }[]):Promise<number>{
     const sum = await this.labourRepository.findSumofLabouor(labours)
     return sum
   }
}