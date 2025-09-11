import { IStageModelEntity } from '../../domain/Entities/modelEntities/stage.entity';
import { IStagemapper } from '../../domain/IMappers/IStage.mapper';
import { displayProjectWithCompletionDTO } from '../dto/project.dto';
import { publicstageDTO } from '../dto/stage.dto';
import { stageWithAggregateProject } from '../Entities/stage.entity';

export class Stagemapper implements IStagemapper {
    topublicStageDto(stage: IStageModelEntity[]): publicstageDTO[] {
        return stage.map((element)=>({
            _id:element._id,
            stage_name:element.stage_name,
            start_date:element.start_date,
            end_date:element.end_date,
            stage_amount:element.stage_amount,
            progress:element.progress,
            status_date:element.status_date,
            stage_image:element.stage_image,
        }));
    }
    toProjectWithCompletionDTO(input: stageWithAggregateProject[]): displayProjectWithCompletionDTO[] {
        return input.map((element)=>({
            _id:element._id,
            completion_per:element.completion_per/element.count,
            project_name:element.project_name,
            start_date:element.start_date,
            end_date:element.end_date,
        }));
    }
}