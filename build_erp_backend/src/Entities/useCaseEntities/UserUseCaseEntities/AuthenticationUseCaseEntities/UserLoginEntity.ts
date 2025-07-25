import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { loginInput } from "../../../Input-OutputEntities/UserEntities/user";

export interface IUserLoginUseCase {
    execute(input: loginInput): Promise<commonOutput>
}