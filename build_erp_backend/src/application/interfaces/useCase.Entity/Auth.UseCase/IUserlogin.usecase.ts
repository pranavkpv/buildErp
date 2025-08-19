import { commonOutput } from "../../../dto/common";
import { userLoginDTO } from "../../../dto/user.dto";
import { Tokens } from "../../../entities/token.entity";
import { loginInput } from "../../../entities/user.entity";

export interface IUserLoginUseCase {
    execute(input: loginInput): Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput>
}