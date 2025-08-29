import { commonOutput } from '../../dto/common';
import { editProjectInput } from '../../Entities/project.entity';

export interface IEditProjectUseCase {
    execute(input: editProjectInput): Promise<commonOutput> 
}