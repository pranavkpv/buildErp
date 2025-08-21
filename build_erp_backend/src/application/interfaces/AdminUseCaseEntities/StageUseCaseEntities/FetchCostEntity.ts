import { commonOutput } from "../../../dto/common";


export interface IFetchCostUseCase {
   execute(projectId:string): Promise<commonOutput<number> | commonOutput> 
}