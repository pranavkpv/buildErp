import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { IUploadEstimateImageUseCase } from '../../IUseCases/IEstimation/IUploadEstimateImage';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { commonOutput } from '../../dto/common';


export class UploadEstimateImageUseCase implements IUploadEstimateImageUseCase {
    constructor(
    private _projectRepository: IprojectRepository,
    ) { }
    async execute(url: string, id: string):
    Promise<commonOutput> {
        await this._projectRepository.updateEstimationImageById(url, id);
        return ResponseHelper.success(EstimationSuccessMessage.UPLOAD);
    }
}