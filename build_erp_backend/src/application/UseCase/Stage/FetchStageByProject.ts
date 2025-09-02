import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { IStagemapper } from '../../../domain/IMappers/IStage.mapper';
import { StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { publicstageDTO } from '../../dto/stage.dto';
import { IFetchStageByprojectUsecase } from '../../IUseCases/IStage/IFetchStageByProject';

export class FetchStageByProjectUseCase implements IFetchStageByprojectUsecase {
    constructor(
      private _stageRepository : IStageRepository,
      private _stagemapper : IStagemapper,
    ){ }
    async execute(id: string): Promise<commonOutput<publicstageDTO[]> | void> {
        const data = await this._stageRepository.findStageByprojectId(id);
        const mappedData = this._stagemapper.topublicStageDto(data);
        return ResponseHelper.success(StageSuccessMessage.FETCH,mappedData);
    }
}