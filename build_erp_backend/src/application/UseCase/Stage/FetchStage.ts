import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { IFetchStageUsecase } from '../../IUseCases/IStage/IFetchStage';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { listingInput } from '../../entities/common.entity';
import { commonOutput } from '../../dto/common';
import { stageListDTO } from '../../dto/stage.dto';
import { IProjectmapper } from '../../../domain/IMappers/IProject.mapper';

export class FetchStageUsecase implements IFetchStageUsecase {
    constructor(
    private _projectRepository: IprojectRepository,
    private _projectmapper: IProjectmapper,
    ) { }
    async execute(input: listingInput): Promise<commonOutput<{ data: stageListDTO[], totalPage: number }> | commonOutput> {
        const { data, totalPage } = await this._projectRepository.getProjectsWithStage(input);
        const mappedData = this._projectmapper.toStageListDto(data);
        return ResponseHelper.success(StageSuccessMessage.FETCH, { data: mappedData, totalPage });
    }
}