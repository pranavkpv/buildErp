import { listingInput } from "../../../application/Entities/common.entity";
import { labourAddInput, labourEditInput, labourSumInput } from "../../../application/Entities/labour.entity";
import { ILabourModelEntity } from "../modelEntities/labour.entity";

export interface ILabourRepository {

   calculateTotalLabourWages(input: labourSumInput[]):
      Promise<number>

   getPaginatedLabourList(input: listingInput):
      Promise<{ data: ILabourModelEntity[], totalPage: number }>;

   getLabourByType(labour_type: string):
      Promise<ILabourModelEntity | null>

   createLabour(input: labourAddInput):
      Promise<void>

   deleteLabourById(_id: string):
      Promise<void>

   checkDuplicateLabourOnEdit(_id: string, labour_type: string):
      Promise<ILabourModelEntity | null>

   updateLabour(input: labourEditInput):
      Promise<void>

   getAllLabours():
      Promise<ILabourModelEntity[] | []>

   getLabourById(_id: string):
      Promise<ILabourModelEntity | null>

}