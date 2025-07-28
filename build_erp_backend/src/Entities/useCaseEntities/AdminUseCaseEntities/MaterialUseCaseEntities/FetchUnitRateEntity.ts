import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { IMaterialModelEntity } from "../../../ModelEntities/Material.Entity";

export interface IFetchUnitRateUseCase{
   execute(material_name:string,brand_name:string,unit_name:string):Promise<IMaterialModelEntity | null | commonOutput>
}