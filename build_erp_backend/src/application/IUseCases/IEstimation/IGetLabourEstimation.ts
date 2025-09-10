import { commonOutput } from "../../dto/common";
import { labourEstimateDTO } from "../../dto/estimation.dto";

export interface IGetLabourEstimationUseCase {
   execute(projectId: string): Promise<commonOutput<labourEstimateDTO[]>>
}