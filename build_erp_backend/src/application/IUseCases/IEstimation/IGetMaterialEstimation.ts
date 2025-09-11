import { commonOutput } from '../../dto/common';
import { materialEstimateDTO } from '../../dto/estimation.dto';

export interface IGetMaterialEstimationUseCase {
   execute(projectId: string): Promise<commonOutput<materialEstimateDTO[]>>
}