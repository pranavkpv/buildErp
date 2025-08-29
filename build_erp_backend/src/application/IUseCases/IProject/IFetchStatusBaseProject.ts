import { commonOutput } from '../../dto/common';
import { publicProjectDTO } from '../../dto/project.dto';
import { fetchprojectInput } from '../../Entities/project.entity';

export interface IFetchStatusBaseProjectUseCase {
   execute(input:fetchprojectInput): Promise<commonOutput<{projectData:publicProjectDTO[],totalPage:number}> | commonOutput>;
}