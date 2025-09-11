import { displayProjectWithCompletionDTO } from '../../application/dto/project.dto';
import { publicstageDTO } from '../../application/dto/stage.dto';
import { stageWithAggregateProject } from '../../application/Entities/stage.entity';
import { IStageModelEntity } from '../Entities/modelEntities/stage.entity';

export interface IStagemapper {
   topublicStageDto(stage:IStageModelEntity[]):publicstageDTO[]
   toProjectWithCompletionDTO(input:stageWithAggregateProject[]):displayProjectWithCompletionDTO[]
}