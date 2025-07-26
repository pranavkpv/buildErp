import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { UpdatePassword } from "../../../Input-OutputEntities/UserEntities/user";

export interface IChangePasswordUseCase {
    execute(input:UpdatePassword):Promise<commonOutput>
}