import { commonOutput } from '../../dto/common';
import { saveUnitInput } from '../../entities/unit.entity';


export interface ISaveUnitUseCase {
   execute(input: saveUnitInput): Promise<commonOutput>
}