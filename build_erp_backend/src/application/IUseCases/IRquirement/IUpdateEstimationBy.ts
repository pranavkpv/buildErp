import { commonOutput } from '../../dto/common';
import { userBaseProjectDTO } from '../../dto/project.dto';

export interface IUpdateEstimationByUseCase {
   execute(projectId:string):Promise<commonOutput | commonOutput<userBaseProjectDTO>>
}