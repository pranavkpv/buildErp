import { commonOutput } from "../../../dto/common";
import { fetchProjectIdnameDTO } from "../../../dto/project.dto";


export interface IAddSiteToprojectFetchProjectUseCase {
   execute():Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput>
}