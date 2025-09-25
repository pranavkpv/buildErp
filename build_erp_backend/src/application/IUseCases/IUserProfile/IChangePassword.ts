import { commonOutput } from '../../dto/common';
import { updatePasswordInput } from '../../entities/user.entity';


export interface IChangePasswordUseCase {
    execute(input:updatePasswordInput):Promise<commonOutput>
}