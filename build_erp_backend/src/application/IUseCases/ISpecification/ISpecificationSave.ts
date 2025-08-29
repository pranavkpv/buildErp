import { commonOutput } from '../../dto/common';
import { InputSpecification } from '../../Entities/spec.entity';

export interface ISaveSpecUseCase {
   execute(input:InputSpecification): Promise<commonOutput>
}