import { commonOutput } from "../../dto/common";
import { userLoginDTO } from "../../dto/user.dto";
import { Tokens } from "../../Entities/token.entity";
import { updateprofileInput } from "../../Entities/user.entity";

export interface IUpdateProfileUseCase {
  execute(input: Omit<updateprofileInput, "password">):
    Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput>;
}