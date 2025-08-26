import { commonOutput } from "../../dto/common";
import { userBaseProjectDTO } from "../../dto/project.dto";


export interface IFetchUserProjectUseCase {
   execute(_id:string): Promise<commonOutput<userBaseProjectDTO[]> | commonOutput>
}