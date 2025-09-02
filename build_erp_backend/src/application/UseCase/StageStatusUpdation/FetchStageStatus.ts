import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { IFetchStatusUseCase } from '../../IUseCases/IStageStatusUpdation/IFetchStageStatus';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { commonOutput } from '../../dto/common';
import { publicstageDTO } from '../../dto/stage.dto';
import { IStagemapper } from '../../../domain/IMappers/IStage.mapper';

export class FetchStatusUseCase implements IFetchStatusUseCase {
    constructor(
      private _stageRepository: IStageRepository,
      private _stagemapper: IStagemapper,
    ) { }
    async execute(id: string): Promise<commonOutput<publicstageDTO[]>> {
        const data = await this._stageRepository.findStageByprojectId(id);
        const mappedStage = this._stagemapper.topublicStageDto(data);
        return ResponseHelper.success(StageSuccessMessage.FETCH, mappedStage);
    }
}