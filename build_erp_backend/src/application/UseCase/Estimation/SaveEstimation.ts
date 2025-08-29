import { ISaveEstimationUseCase } from '../../IUseCases/IEstimation/ISaveEstimation';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { saveEstimationInput } from '../../Entities/estimation.entity';
import { commonOutput } from '../../dto/common';


export class SaveEstimationUseCase implements ISaveEstimationUseCase {
    constructor(
      private _estimationRepository: IEstimationRepository,
    ) { }
    async execute(input: { projectId: string, row: saveEstimationInput[] }):
      Promise<commonOutput> {
        const projectId = input.projectId;
        const specDetails = input.row;
        await this._estimationRepository.createEstimation(specDetails, projectId);
        return ResponseHelper.createdSuccess(EstimationSuccessMessage.ADD);
    }
}