import { commonOutput } from "../../dto/common";
import { userLoginDTO } from "../../dto/user.dto";
import { Tokens } from "../../Entities/token.entity";
import { loginInput } from "../../Entities/user.entity";

export interface IUserLoginUseCase {
    execute(input: loginInput): Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput>
}