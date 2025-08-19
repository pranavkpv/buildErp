import { commonOutput } from "../../../dto/CommonEntities/common";
import { labourOutput } from "../../../dto/LabourEntities/labour";


export interface IFetchLabourByIdUsecaseEntity{
   execute(_id:string):Promise<labourOutput | commonOutput>
}