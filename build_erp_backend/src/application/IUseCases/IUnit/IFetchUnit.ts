import { commonOutput } from '../../dto/common';
import { idUnitnameDTO } from '../../dto/unit.dto';

export interface IFetchUnitUseCase {
   execute():Promise<commonOutput<idUnitnameDTO[]>>
}