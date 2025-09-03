import { commonOutput } from '../../dto/common';
import { displayStatusCountDTO } from '../../dto/project.dto';

export interface IFetchProjectCountandStatusUseCase {
   execute(): Promise<commonOutput<displayStatusCountDTO[]> | commonOutput>
}