import { commonOutput } from '../../dto/common';
import { saveUnitInput } from '../../Entities/unit.entity';


export interface ISaveUnitUseCase {
   execute(input: saveUnitInput): Promise<commonOutput>
}