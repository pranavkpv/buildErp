import { inputUnit, listUnitOutput } from "../../../DTO/UnitEntities/Unit.Entity"
import { IUnitModelEntity } from "../../ModelEntities/Unit.Entity"

export interface IUnitRepositoryEntity {
   findUnit(): Promise<IUnitModelEntity[] | []>
   findUnitByunit_name(input: inputUnit): Promise<IUnitModelEntity | null>
   saveUnit(input: inputUnit): Promise<IUnitModelEntity | null>
   findUnitInEdit(input: inputUnit): Promise<IUnitModelEntity | null>
   updateUnitById(input: inputUnit): Promise<IUnitModelEntity | null>
   deleteUnitById(_id: string): Promise<IUnitModelEntity | null>
   findAllListUnit(page: number, search: string): Promise<listUnitOutput>
   findUnitById(_id:string):Promise<IUnitModelEntity | null>
}