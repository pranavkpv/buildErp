import { commonOutput } from '../../dto/common';
import { editProjectInput } from '../../entities/project.entity';

export interface IEditProjectUseCase {
    execute(input: editProjectInput): Promise<commonOutput> 
}