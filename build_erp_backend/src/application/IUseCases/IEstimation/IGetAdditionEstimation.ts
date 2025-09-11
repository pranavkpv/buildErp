import { commonOutput } from '../../dto/common';
import { additionEstimateDTO } from '../../dto/estimation.dto';

export interface IGetAdditionEstimationUseCase {
   execute(projectId:string):Promise<commonOutput<additionEstimateDTO[]>>
}