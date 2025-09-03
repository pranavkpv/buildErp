import { IDisplayEstimationUseCase } from '../../IUseCases/IEstimation/IDisplayEstimation';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { listEstimationDTO } from '../../dto/estimation.dto';
import { commonOutput } from '../../dto/common';
import { IEstimationmapper } from '../../../domain/IMappers/IEstimation.mapper';
import cloudinary from '../../../infrastructure/config/cloudinary';


export class DisplayEstimationUseCase implements IDisplayEstimationUseCase {
    constructor(
    private _estimationRepository: IEstimationRepository,
    private _estimationMapper: IEstimationmapper,
    ) { }
    async axecute(search: string, page: number):
    Promise<commonOutput<{ data: listEstimationDTO[], totalPage: number }> | commonOutput> {
        const { data, totalPage } = await this._estimationRepository.getEstimationsGroupedByProject(search, page);
        for (const element of data) {
            element.projectDetails.expected_image = cloudinary.url(element.projectDetails.expected_image, {
                type: 'authenticated',
                sign_url: true,
                expires_at: Math.floor(Date.now() / 1000) + 60,
            });
        }
        const mappedData = this._estimationMapper.tolistEstimationDTO(data);
        return ResponseHelper.success(EstimationSuccessMessage.FETCH, { data: mappedData, totalPage });
    }
}