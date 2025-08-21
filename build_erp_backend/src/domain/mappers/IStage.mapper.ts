import { publicstageDTO, stageListDTO } from "../../application/dto/stage.dto";
import { IStageModelEntity } from "../Entities/modelEntities/stage.entity";

export interface IStagemapper {
   topublicStageDto(stage:IStageModelEntity[]):publicstageDTO[]
}