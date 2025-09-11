import { commonOutput } from '../../dto/common';
import { rejectEstimationInput } from '../../Entities/estimation.entity';

export interface IRejectEstimationUseCase {
   execute(input: rejectEstimationInput): Promise<commonOutput>
}