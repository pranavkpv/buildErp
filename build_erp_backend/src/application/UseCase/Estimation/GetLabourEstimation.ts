import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { IEstimationmapper } from '../../../domain/IMappers/IEstimation.mapper';
import { EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { labourEstimateDTO } from '../../dto/estimation.dto';
import { IGetLabourEstimationUseCase } from '../../IUseCases/IEstimation/IGetLabourEstimation';

export class GetLabourEstimationUseCase implements IGetLabourEstimationUseCase {
    constructor(
      private _estimationRepository: IEstimationRepository,
      private _estimationMapper: IEstimationmapper,
    ) { }
    async execute(projectId: string): Promise<commonOutput<labourEstimateDTO[]>> {
        const data = await this._estimationRepository.getAggregateByLabour(projectId);
        const mappedData = this._estimationMapper.tolabourEstimateDTO(data);
        return ResponseHelper.success(EstimationSuccessMessage.FETCH,mappedData);
    }
}