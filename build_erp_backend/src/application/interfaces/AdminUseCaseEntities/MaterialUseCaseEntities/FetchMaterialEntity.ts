import { commonOutput } from "../../../dto/common";


export interface IFetchMaterialUseCase {
   execute():Promise<commonOutput<string[]>> 
}