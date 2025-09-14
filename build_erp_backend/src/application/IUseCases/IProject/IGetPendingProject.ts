import { commonOutput } from "../../dto/common";
import { fetchProjectIdnameDTO } from "../../dto/project.dto";

export interface IGetPendingProjectUseCase {
   execute(): Promise<commonOutput<fetchProjectIdnameDTO[]>>
}