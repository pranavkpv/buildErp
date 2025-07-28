import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDisplayAllLabourUsecase{
   execute(page:number,search:string): Promise<{getLabourData:any[];totalPage:number } | commonOutput>
}