import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { labourOutput } from "../../../Input-OutputEntities/LabourEntities/labour";

export interface IDisplayAllLabourUsecase{
   execute(page:number,search:string): Promise<labourOutput | commonOutput>
}