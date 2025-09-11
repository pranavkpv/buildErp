import { commonOutput } from '../../dto/common';
import { estimateByProjectDTO } from '../../dto/estimation.dto';

export interface IGetEstimationByProjectUsecase {
   execute(projectId: string): Promise<commonOutput<estimateByProjectDTO[]>>
}