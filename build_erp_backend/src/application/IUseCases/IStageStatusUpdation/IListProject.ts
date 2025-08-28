import { commonOutput } from "../../dto/common";
import { fetchProjectIdnameDTO } from "../../dto/project.dto";



export interface IListProjectUseCase {
   execute(user:string):Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput>
}