import { commonOutput } from "../../../dto/common";
import { fetchProjectIdnameDTO } from "../../../dto/project.dto";


export interface IGetToProjectUseCaseEntity {
   execute(projectId:string): Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput>
}