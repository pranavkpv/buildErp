import { commonOutput } from '../../dto/common';
import { addProjectInput } from '../../entities/project.entity';


export interface IAddProjectUseCase {
   execute(input: addProjectInput): Promise<commonOutput<string> | commonOutput>
}