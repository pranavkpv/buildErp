import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { labourOutput } from "../../../../DTO/LabourEntities/labour";


export interface IFetchLabourByIdUsecaseEntity{
   execute(_id:string):Promise<labourOutput | commonOutput>
}