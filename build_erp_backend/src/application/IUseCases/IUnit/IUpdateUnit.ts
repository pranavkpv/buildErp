import { commonOutput } from '../../dto/common';
import { saveUnitInput } from '../../entities/unit.entity';

export interface IUpdateUnitUseCase {
   execute(input: saveUnitInput): Promise<commonOutput>
}