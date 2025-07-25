import { SpecData } from "../../../Input-OutputEntities/EstimationEntities/estimation";

export interface IDisplayEstimationUseCase{
   axecute(search:string,page:number):Promise<{data:SpecData[],totalPage:number}>
}