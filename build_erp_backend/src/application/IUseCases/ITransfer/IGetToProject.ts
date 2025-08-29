import { commonOutput } from '../../dto/common';
import { fetchProjectIdnameDTO } from '../../dto/project.dto';


export interface IGetToProjectUseCase {
   execute(projectId: string):
      Promise<commonOutput<fetchProjectIdnameDTO[]> | commonOutput>
}