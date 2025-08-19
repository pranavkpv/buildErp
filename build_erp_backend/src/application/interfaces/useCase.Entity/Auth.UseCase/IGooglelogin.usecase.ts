import { commonOutput } from "../../../dto/common";
import { userLoginDTO } from "../../../dto/user.dto";
import { Tokens } from "../../../entities/token.entity";
import { googleLoginInput } from "../../../entities/user.entity";


export interface IGoogleloginUseCase {
    execute(input: googleLoginInput): Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput>
}