import { IStageModelEntity } from "../../domain/Entities/modelEntities/stage.entity";
import { IStagemapper } from "../../domain/mappers/IStage.mapper";
import { publicstageDTO, stageListDTO } from "../dto/stage.dto";

export class Stagemapper implements IStagemapper {
   topublicStageDto(stage: IStageModelEntity[]): publicstageDTO[] {
       return stage.map((element)=>({
         _id:element._id,
         stage_name:element.stage_name,
         start_date:element.start_date,
         end_date:element.end_date,
         stage_amount:element.stage_amount,
         progress:element.progress,
         status_date:element.status_date
       }))
   }
}