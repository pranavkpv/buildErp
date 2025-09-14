import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { EstimationFailedMessage, EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { ISendEstimationUseCase } from '../../IUseCases/IEstimation/IDeleteEstimation';
import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { commonOutput } from '../../dto/common';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';


export class SendEstimationUseCase implements ISendEstimationUseCase {

    constructor(
      private _estimationRepository: IEstimationRepository,
      private _stageRepository: IStageRepository,
      private _projectRepository: IprojectRepository,
    ) { }
    async execute(id: string): Promise<commonOutput> {
        const existStage = await this._stageRepository.findStageByprojectId(id);
        if (existStage.length===0) {
            return ResponseHelper.conflictData(EstimationFailedMessage.NOT_STAGE);
        }
        await this._estimationRepository.sendEstimationsByProjectId(id);
        await this._projectRepository.updateEstimationStatus(true,id);
        return ResponseHelper.success(EstimationSuccessMessage.DELETE);
    }
}