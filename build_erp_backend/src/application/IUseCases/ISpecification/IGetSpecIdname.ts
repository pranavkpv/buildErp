import { commonOutput } from '../../dto/common';
import { userSpecDTO } from '../../dto/specification.dto';

export interface IGetSpecIdnameUseCase {
   execute(): Promise<commonOutput<userSpecDTO[]>>
}