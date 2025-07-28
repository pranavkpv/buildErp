import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IFetchMaterialUseCase {
   execute():Promise<string[] | commonOutput>
}