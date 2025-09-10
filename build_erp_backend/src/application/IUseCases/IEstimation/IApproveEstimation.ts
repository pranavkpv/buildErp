import { commonOutput } from "../../dto/common";

export interface IApproveEstimationUseCase {
   execute(projectId: string): Promise<commonOutput>
}