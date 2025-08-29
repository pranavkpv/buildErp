import { commonOutput } from '../../dto/common';
import { publicEstimationDTO } from '../../dto/estimation.dto';


export interface IFetchExistEstimationUseCase {
   execute(_id: string):
      Promise<commonOutput<publicEstimationDTO[]>>
}