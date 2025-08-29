import { listingInput } from '../../../application/Entities/common.entity';
import { saveUnitInput } from '../../../application/Entities/unit.entity';
import { IUnitModelEntity } from '../modelEntities/unit.entity';

export interface IUnitRepository {

   getAllUnits():
      Promise<IUnitModelEntity[] | []>

   getUnitByName(unit_name: string):
      Promise<IUnitModelEntity | null>

   createUnit(input: saveUnitInput):
      Promise<IUnitModelEntity | null>

   checkUnitExistsOnEdit(id: string, unit_name: string):
      Promise<IUnitModelEntity | null>

   updateUnit(input: saveUnitInput):
      Promise<IUnitModelEntity | null>

   deleteUnit(id: string):
      Promise<IUnitModelEntity | null>

   getPaginatedUnits(input: listingInput):
      Promise<{ data: IUnitModelEntity[], totalPage: number }>

   getUnitById(id: string):
      Promise<IUnitModelEntity | null>
}