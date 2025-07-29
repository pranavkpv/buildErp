import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { brandOutput } from "../../../Input-OutputEntities/MaterialEntities/brand";

export interface IDisplayAllBrandUseCase{
   execute(page:number,search:string): Promise<brandOutput | commonOutput>
}