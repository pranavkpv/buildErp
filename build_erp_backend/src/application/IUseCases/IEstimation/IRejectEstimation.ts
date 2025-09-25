import { commonOutput } from '../../dto/common';
import { rejectEstimationInput } from '../../entities/estimation.entity';

export interface IRejectEstimationUseCase {
   execute(input: rejectEstimationInput): Promise<commonOutput>
}