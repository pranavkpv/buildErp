import { commonOutput } from '../../dto/common';
import { publicstageDTO } from '../../dto/stage.dto';

export interface IFetchStageByprojectUsecase {
   execute(id:string):Promise<commonOutput<publicstageDTO[]> | void>
}