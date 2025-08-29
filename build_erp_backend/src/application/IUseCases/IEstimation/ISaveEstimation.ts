import { commonOutput } from '../../dto/common';
import { saveEstimationInput } from '../../Entities/estimation.entity';


export interface ISaveEstimationUseCase {
    execute(input: { projectId: string, row: saveEstimationInput[] }):
        Promise<commonOutput>
}