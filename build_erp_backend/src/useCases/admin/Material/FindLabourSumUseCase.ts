//here find the sum of labour with labour_id,number of labour in estimation

import { ILabourRepository } from "../../../domain/repositories/ILabourRepository";

export class FindlabourSumUsecase{
   private labourRepository:ILabourRepository
   constructor(labourRepository:ILabourRepository){
      this.labourRepository = labourRepository
   }
   async execute(labours:{ labour_id: string, numberoflabour: number }[]){
     const sum = await this.labourRepository.findSumofLabouor(labours)
     return sum
   }
}