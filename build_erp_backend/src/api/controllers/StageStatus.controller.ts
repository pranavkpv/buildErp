import { Request, Response, NextFunction } from 'express';
import { IstatusController } from '../../domain/Entities/IController/IStageStatus.controller';
import { IStageStatusChangeUseCase } from '../../application/IUseCases/IStageStatusUpdation/IStageStatusChange';
import { IUploadStatusImageUseCase } from '../../application/IUseCases/IStageStatusUpdation/IUploadStatusImage';
import { StageFailedMessage } from '../../Shared/Messages/Stage.Message';
import { HTTP_STATUS } from '../../Shared/statusCodes/statusCodes';
import { commonOutput } from '../../application/dto/common';
import { publicstageDTO } from '../../application/dto/stage.dto';
import { IFetchStageByprojectUsecase } from '../../application/IUseCases/IStage/IFetchStageByProject';
import { SpecFailedMessage } from '../../Shared/Messages/Specification.Message';
import { IFileUploader } from '../../domain/Entities/Service.Entities/IFileUploaders';

export class StatusController implements IstatusController {

    constructor(
        private _stageStatusChangeUseCase: IStageStatusChangeUseCase,
        private _uploadStatusImageUseCase: IUploadStatusImageUseCase,
        private _fetchStageByprojectUsecase: IFetchStageByprojectUsecase,
        private _fileUploaderService: IFileUploader
    ) { }

    //  Update stage status 
    updateStageStatus = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const result = await this._stageStatusChangeUseCase.execute({
                stageId: req.params.id,
                ...req.body,
            });
            return result;
        } catch (error) {
            next(error);
        }
    };

    //  Upload stage-related images 
    uploadStageImages = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput | void> => {
        try {
            const file = req.files?.image;
            const { _id, date } = req.body;

            if (!file) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: StageFailedMessage.NO_IMAGE });
                return;
            }

            const urls: string[] = [];
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

            if (Array.isArray(file)) {
                for (const char of file) {
                    const result = await this._fileUploaderService.upload(char.tempFilePath)
                    urls.push(result);
                    if (!allowedTypes.includes(char.mimetype)) {
                        res.status(HTTP_STATUS.BAD_REQUEST).
                            json({ success: false, message: SpecFailedMessage.INVALID_FILE });
                        return;
                    }

                }
            } else {
                const result = await this._fileUploaderService.upload(file.tempFilePath)
                urls.push(result);
            }

            const exactResult = await this._uploadStatusImageUseCase.execute(urls, _id, date);
            return exactResult;

        } catch (error) {
            next(error);
        }
    };
    //fetch stages by projects
    getStageByProjectId = async (req: Request, res: Response, next: NextFunction):
        Promise<commonOutput<publicstageDTO[]> | void> => {
        try {
            const _id = req.params.id;
            const stageData = await this._fetchStageByprojectUsecase.execute(_id);
            return stageData;
        } catch (error) {
            next(error);
        }

    };
}
