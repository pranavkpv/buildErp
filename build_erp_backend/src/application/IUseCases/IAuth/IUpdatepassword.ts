import { commonOutput } from "../../dto/common";
import { loginInput } from "../../Entities/user.entity";

export interface IUpdatePasswordUseCase {
   execute(input:loginInput):Promise<commonOutput>
}