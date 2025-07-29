import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { labourOutput } from "../../../Input-OutputEntities/LabourEntities/labour";

export interface IFetchAllLabourUseCase{
   execute():Promise<labourOutput | commonOutput>
}