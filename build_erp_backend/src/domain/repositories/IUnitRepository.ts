import { Unit } from "../types/unit";

export interface IUnitRepository{
   findUnit():Promise<Unit[] | null>
   findUnitByunit_name(unit_name:string):Promise<Unit |null>
   saveUnit(unit_name:string,short_name:string):Promise<void>
   findUnitInEdit(_id:string,unit_name:string):Promise<Unit | null>
   updateUnitById(_id:string,unit_name:string,short_name:string):Promise<void>
   deleteUnitById(_id:string):Promise<void>
   findAllListUnit(page:number,search:string):Promise<{getUnitData:any[];totalPage:number }>
   
}