import { commonOutput } from '../../dto/common';
import { publicstageDTO } from '../../dto/stage.dto';


export interface IFetchStatusUseCase {
   execute(id:string): Promise<commonOutput<publicstageDTO[]>>
}