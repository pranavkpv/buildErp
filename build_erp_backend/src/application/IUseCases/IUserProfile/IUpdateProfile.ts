import { commonOutput } from '../../dto/common';
import { userLoginDTO } from '../../dto/user.dto';
import { Tokens } from '../../entities/token.entity';
import { updateprofileInput } from '../../entities/user.entity';

export interface IUpdateProfileUseCase {
  execute(input: Omit<updateprofileInput, 'password'>):
    Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput>;
}