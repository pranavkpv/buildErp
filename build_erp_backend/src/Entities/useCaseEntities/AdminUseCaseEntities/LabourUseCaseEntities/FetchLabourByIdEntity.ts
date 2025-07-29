import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { labourOutput } from "../../../Input-OutputEntities/LabourEntities/labour";


export interface IFetchLabourByIdUsecase{
   execute(_id:string):Promise<labourOutput | commonOutput>
}