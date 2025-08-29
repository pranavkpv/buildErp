import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { IUploadStatusImageUseCase } from '../../IUseCases/IStageStatusUpdation/IUploadStatusImage';
import { commonOutput } from '../../dto/common';

export class UploadStatusImageUseCase implements IUploadStatusImageUseCase {
    constructor(
        private _stageRepository: IStageRepository,
    ) { }
    async execute(url: string[] | string, id: string, date: string): Promise<commonOutput> {
        await this._stageRepository.uploadImageByStageId({ _id:id, url, date });
        return ResponseHelper.success(StageSuccessMessage.UPLOAD_IMAGE);
    }
}