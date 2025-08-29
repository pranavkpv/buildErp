import { IUpdateStageUseCase } from '../../IUseCases/IStage/IUpdateStage';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { StageFailedMessage, StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { stageInputData } from '../../Entities/stage.entity';
import { commonOutput } from '../../dto/common';

export class UpdateStageUseCase implements IUpdateStageUseCase {
    constructor(
      private _stageRepository: IStageRepository,
      private _projectRepository: IprojectRepository,
    ) { }
    async execute(input: stageInputData): Promise<commonOutput> {
        const { projectId, stages, startDate, endDate, cost } = input;
        const existUpdationOnstage = await this._stageRepository.findStageByprojectId(projectId);
        for (const element of existUpdationOnstage) {
            if (element.progress > 0) {
                return ResponseHelper.conflictData(StageFailedMessage.ALREADY_USED);
            }
        }
        await this._stageRepository.DeleteStageByproject(projectId);
        for (const char of stages) {
            await this._stageRepository.stageDataSave(projectId, char);
        }
        await this._projectRepository.setProjectCost({ projectId, startDate, endDate, cost });
        return ResponseHelper.success(StageSuccessMessage.UPDATE);
    }
}