import { commonOutput } from '../../dto/common';
import { publicProjectDTO } from '../../dto/project.dto';

export interface IGetAllProjectListInUserusecase {
   execute():Promise<commonOutput<publicProjectDTO[]>>
}