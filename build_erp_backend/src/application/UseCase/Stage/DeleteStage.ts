import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { StageFailedMessage, StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { IDeleteStageUseCase } from '../../IUseCases/IStage/IDeleteStage';
import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { commonOutput } from '../../dto/common';

export class DeleteStageUseCase implements IDeleteStageUseCase {
    constructor(
      private _stageRepository: IStageRepository,
    ) { }
    async execute(id: string): Promise<commonOutput> {
        const existUpdationOnstage = await this._stageRepository.findStageByprojectId(id);
        for (const element of existUpdationOnstage) {
            if (element.progress > 0) {
                return ResponseHelper.conflictData(StageFailedMessage.ALREADY_USED);
            }
        }
        await this._stageRepository.RemoveDateinProject(id);
        await this._stageRepository.DeleteStageByproject(id);
        return ResponseHelper.success(StageSuccessMessage.DELETE);
    }
}