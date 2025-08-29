import { IFetchCostUseCase } from '../../IUseCases/IStage/IFetchCost';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { StageFailedMessage, StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { commonOutput } from '../../dto/common';

export class FetchCostUseCase implements IFetchCostUseCase {
    constructor(
      private _estimationReposiitory: IEstimationRepository,
    ) { }
    async execute(projectId: string): Promise<commonOutput<number> | commonOutput> {
        const ExistEstimation = await this._estimationReposiitory.getEstimationsByProjectId(projectId);
        if (ExistEstimation.length === 0) {
            return ResponseHelper.conflictData(StageFailedMessage.NOT_ESTIMATE);
        }
        let sum = 0;
        for (const element of ExistEstimation) {
            sum += (element.quantity * element.unit_rate);
        }
        return ResponseHelper.success(StageSuccessMessage.FETCH_COST, sum);
    }
}