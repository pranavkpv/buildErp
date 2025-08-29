import { commonOutput } from '../../dto/common';
import { addProjectInput } from '../../Entities/project.entity';


export interface IAddProjectUseCase {
   execute(input: addProjectInput): Promise<commonOutput>
}