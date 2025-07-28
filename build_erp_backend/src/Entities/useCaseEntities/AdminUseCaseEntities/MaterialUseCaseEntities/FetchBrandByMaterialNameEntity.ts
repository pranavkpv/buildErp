import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IFetchBrandByMaterialName {
   execute(material_name: string): Promise<string[] | commonOutput>
}