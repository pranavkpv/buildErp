import { commonOutput } from '../../dto/common';
import { userLoginDTO } from '../../dto/user.dto';
import { Tokens } from '../../entities/token.entity';


export interface IUpdateProfileImageUseCase {
   execute(url: string, id: string):
      Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput>
}