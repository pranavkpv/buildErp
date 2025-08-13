import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { loginInput } from "../../../../DTO/UserEntities/user";

export interface IUserLoginUseCaseEntity {
    execute(input: loginInput): Promise<commonOutput>
}