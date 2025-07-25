import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { userSignupInput } from "../../../Input-OutputEntities/UserEntities/user";

export interface ISignupUserUseCase{
   execute(input: userSignupInput): Promise<commonOutput>
}