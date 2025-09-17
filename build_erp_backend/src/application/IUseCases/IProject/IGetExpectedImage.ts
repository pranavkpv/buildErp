import { commonOutput } from "../../dto/common";
import { expectedImageDTO } from "../../dto/project.dto";

export interface IGetExpectedImageUseCase {
   execute(projectId: string): Promise<commonOutput<expectedImageDTO[]> | commonOutput>
}