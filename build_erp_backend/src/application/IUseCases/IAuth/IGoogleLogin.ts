import { commonOutput } from "../../dto/common";
import { userLoginDTO } from "../../dto/user.dto";
import { Tokens } from "../../Entities/token.entity";
import { googleLoginInput } from "../../Entities/user.entity";


export interface IGoogleloginUseCase {
    execute(input: googleLoginInput):
        Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput>
}