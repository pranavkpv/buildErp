import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IFetchMaterialByMaterialName{
   execute(material_name:string):Promise<string[] | commonOutput>
}