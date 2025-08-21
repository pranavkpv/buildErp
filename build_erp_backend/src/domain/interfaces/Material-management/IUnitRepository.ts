import { listingInput } from "../../../application/entities/common.entity"
import { saveUnitInput } from "../../../application/entities/unit.entity"
import { IUnitModelEntity } from "../../Entities/modelEntities/unit.entity"

export interface IUnitRepository {
   findUnit(): Promise<IUnitModelEntity[] | []>
   findUnitByunit_name(unit_name:string): Promise<IUnitModelEntity | null>
   saveUnit(input: saveUnitInput): Promise<IUnitModelEntity | null>
   findUnitInEdit(_id:string,unit_name:string): Promise<IUnitModelEntity | null>
   updateUnitById(input: saveUnitInput): Promise<IUnitModelEntity | null>
   deleteUnitById(_id: string): Promise<IUnitModelEntity | null>
   findAllListUnit(input:listingInput): Promise<{data:IUnitModelEntity[],totalPage:number}>
   findUnitById(_id:string):Promise<IUnitModelEntity | null>
}