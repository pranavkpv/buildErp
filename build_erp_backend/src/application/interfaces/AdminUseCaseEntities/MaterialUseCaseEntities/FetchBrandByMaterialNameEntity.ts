import { commonOutput } from "../../../dto/common";


export interface IFetchBrandByMaterialNameUsecase {
   execute(material_name: string): Promise<commonOutput<string[]>>
}