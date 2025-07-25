import { ISpecModelEntity } from "../../../ModelEntities/Spec.Entity";

export interface ISpeclistUseCase {
   execute(page:number,search:string):Promise<{result:any[],totalPage:number}>
}