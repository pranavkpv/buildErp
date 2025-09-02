import { IFetchExistEstimationUseCase } from '../../IUseCases/IEstimation/IFetchExistEstimation';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { commonOutput } from '../../dto/common';
import { publicEstimationDTO } from '../../dto/estimation.dto';
import { IEstimationmapper } from '../../../domain/IMappers/IEstimation.mapper';

export class FetchExistEstimationUseCase implements IFetchExistEstimationUseCase {
    constructor(
    private _estimationRepository: IEstimationRepository,
    private _estimationMapper: IEstimationmapper,
    ) { }
    async execute(id: string):
    Promise<commonOutput<publicEstimationDTO[]>> {
        const data = await this._estimationRepository.getEstimationsGroupedBySpec(id);
        const mappedData = this._estimationMapper.topublicEstimateData(data);
        return ResponseHelper.success(EstimationSuccessMessage.FETCH, mappedData);
    }
}