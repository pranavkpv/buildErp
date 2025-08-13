import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { labourOutput } from "../../../../DTO/LabourEntities/labour";

export interface IDisplayAllLabourUsecaseEntity{
   execute(page:number,search:string): Promise<labourOutput | commonOutput>
}