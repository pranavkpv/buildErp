import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';
import { IStagemapper } from '../../../domain/IMappers/IStage.mapper';
import { StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { displayProjectWithCompletionDTO } from '../../dto/project.dto';
import { IfetchProjectWithCompletionUseCase } from '../../IUseCases/IProject/IfetchProjectWithCompletion';

export class FetchProjectWithCompletionUseCase implements IfetchProjectWithCompletionUseCase {
    constructor(
      private _stageRepository: IStageRepository,
      private _stagemapper: IStagemapper,
    ) { }
    async execute(sitemanagerId: string,page:number,search:string): Promise<commonOutput<{data:displayProjectWithCompletionDTO[],totalPages:number}>> {
        const { data,totalPages } = await this._stageRepository.getAggregateStageByProjectIdmatchSitemanager(sitemanagerId,page,search);
        const mappedData = this._stagemapper.toProjectWithCompletionDTO(data);
        return ResponseHelper.success(StageSuccessMessage.FETCH, { data:mappedData,totalPages });
    }
}