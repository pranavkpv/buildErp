import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { IUploadEstimateImageUseCase } from '../../IUseCases/IEstimation/IUploadEstimateImage';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { commonOutput } from '../../dto/common';
import { imageUploadInput } from '../../Entities/estimation.entity';


export class UploadEstimateImageUseCase implements IUploadEstimateImageUseCase {
    constructor(
    private _projectRepository: IprojectRepository,
    ) { }
    async execute(input: imageUploadInput):
    Promise<commonOutput> {
        await this._projectRepository.updateEstimationImageById(input);
        return ResponseHelper.success(EstimationSuccessMessage.UPLOAD);
    }
}