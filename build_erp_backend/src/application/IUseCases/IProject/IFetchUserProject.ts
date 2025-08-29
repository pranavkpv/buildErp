import { commonOutput } from '../../dto/common';
import { userBaseProjectDTO } from '../../dto/project.dto';


export interface IFetchUserProjectUseCase {
   execute(id:string): Promise<commonOutput<userBaseProjectDTO[]> | commonOutput>
}