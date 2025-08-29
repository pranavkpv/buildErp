import { commonOutput } from '../../dto/common';
import { saveUnitInput } from '../../Entities/unit.entity';

export interface IUpdateUnitUseCase {
   execute(input: saveUnitInput): Promise<commonOutput>
}