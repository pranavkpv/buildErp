import { commonOutput } from "../../dto/common";


export interface IFetchMaterialByMaterialNameUsecase{
   execute(material_name:string):Promise<commonOutput<string[]>> 
}