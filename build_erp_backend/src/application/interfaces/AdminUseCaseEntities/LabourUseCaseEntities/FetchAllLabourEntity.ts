import { commonOutput } from "../../../dto/CommonEntities/common";
import { labourOutput } from "../../../dto/LabourEntities/labour";

export interface IFetchAllLabourUseCaseEntity{
   execute():Promise<labourOutput | commonOutput>
}