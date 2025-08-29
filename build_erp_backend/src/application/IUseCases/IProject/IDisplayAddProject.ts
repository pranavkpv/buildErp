import { commonOutput } from '../../dto/common';
import { userLoginDTO } from '../../dto/user.dto';


export interface IDisplayAddProjectUseCase {
   execute(): Promise<commonOutput<userLoginDTO[]> | commonOutput>
}