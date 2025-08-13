import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { labourOutput } from "../../../../DTO/LabourEntities/labour";

export interface IFetchAllLabourUseCaseEntity{
   execute():Promise<labourOutput | commonOutput>
}