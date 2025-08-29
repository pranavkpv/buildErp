import { commonOutput } from '../../dto/common';
import { updatePasswordInput } from '../../Entities/user.entity';


export interface IChangePasswordUseCase {
    execute(input:updatePasswordInput):Promise<commonOutput>
}