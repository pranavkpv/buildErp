import { commonOutput } from "../../dto/common";
import { fetchProjectIdnameDTO } from "../../dto/project.dto";

export interface IFetchProjectUseCase {
    execute(): Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput>
}