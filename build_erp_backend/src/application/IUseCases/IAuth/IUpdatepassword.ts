import { commonOutput } from '../../dto/common';
import { loginInput } from '../../entities/user.entity';

export interface IUpdatePasswordUseCase {
   execute(input:loginInput):Promise<commonOutput>
}