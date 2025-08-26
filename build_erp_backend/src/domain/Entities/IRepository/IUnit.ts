import { listingInput } from "../../../application/Entities/common.entity"
import { saveUnitInput } from "../../../application/Entities/unit.entity"
import { IUnitModelEntity } from "../modelEntities/unit.entity"

export interface IUnitRepository {

   getAllUnits():
      Promise<IUnitModelEntity[] | []>

   getUnitByName(unit_name: string):
      Promise<IUnitModelEntity | null>

   createUnit(input: saveUnitInput):
      Promise<IUnitModelEntity | null>

   checkUnitExistsOnEdit(_id: string, unit_name: string):
      Promise<IUnitModelEntity | null>

   updateUnit(input: saveUnitInput):
      Promise<IUnitModelEntity | null>

   deleteUnit(_id: string):
      Promise<IUnitModelEntity | null>

   getPaginatedUnits(input: listingInput):
      Promise<{ data: IUnitModelEntity[], totalPage: number }>

   getUnitById(_id: string):
      Promise<IUnitModelEntity | null>
}