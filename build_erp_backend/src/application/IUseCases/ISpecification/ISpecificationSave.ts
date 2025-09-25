import { commonOutput } from '../../dto/common';
import { InputSpecification } from '../../entities/spec.entity';

export interface ISaveSpecUseCase {
   execute(input:InputSpecification): Promise<commonOutput>
}