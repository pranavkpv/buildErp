import { listingInput } from '../../../application/entities/common.entity';
import { labourAddInput, labourEditInput, labourSumInput } from '../../../application/entities/labour.entity';
import { ILabourModelEntity } from '../modelEntities/labour.entity';

export interface ILabourRepository {

   calculateTotalLabourWages(input: labourSumInput[]):
      Promise<number>

   getPaginatedLabourList(input: listingInput):
      Promise<{ data: ILabourModelEntity[], totalPage: number }>;

   getLabourByType(labourType: string):
      Promise<ILabourModelEntity | null>

   createLabour(input: labourAddInput):
      Promise<void>

   deleteLabourById(id: string):
      Promise<void>

   checkDuplicateLabourOnEdit(id: string, labourType: string):
      Promise<ILabourModelEntity | null>

   updateLabour(input: labourEditInput):
      Promise<void>

   getAllLabours():
      Promise<ILabourModelEntity[] | []>

   getLabourById(id: string):
      Promise<ILabourModelEntity | null>

}