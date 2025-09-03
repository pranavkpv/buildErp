import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { EstimationFailedMessage, EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { IDeleteEstimationUseCase } from '../../IUseCases/IEstimation/IDeleteEstimation';
import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { commonOutput } from '../../dto/common';


export class DeleteEstimationUseCase implements IDeleteEstimationUseCase {

    constructor(
      private _estimationRepository: IEstimationRepository,
      private _stageRepository: IStageRepository,
    ) { }
    async execute(id: string): Promise<commonOutput> {
        const existStage = await this._stageRepository.findStageByprojectId(id);
        if (existStage.length>0) {
            return ResponseHelper.conflictData(EstimationFailedMessage.USED_STAGE);
        }
        await this._estimationRepository.deleteEstimationsByProjectId(id);
        return ResponseHelper.success(EstimationSuccessMessage.DELETE);
    }
}