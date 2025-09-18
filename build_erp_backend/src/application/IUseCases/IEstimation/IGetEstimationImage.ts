import { commonOutput } from "../../dto/common";
import { estimationImageDTO } from "../../dto/estimation.dto";

export interface IGetEstimationImageUsecase {
   execute(project: string): Promise<commonOutput<estimationImageDTO[]>>
}