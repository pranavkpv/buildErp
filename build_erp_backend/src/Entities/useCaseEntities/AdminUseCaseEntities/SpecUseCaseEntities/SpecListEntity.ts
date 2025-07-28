import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface ISpeclistUseCase {
   execute(page:number,search:string):Promise<{result:any[],totalPage:number} | commonOutput>
}