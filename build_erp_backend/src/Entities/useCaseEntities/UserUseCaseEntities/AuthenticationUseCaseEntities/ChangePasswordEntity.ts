import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { UpdatePassword } from "../../../../DTO/UserEntities/user";

export interface IChangePasswordUseCaseEntity {
    execute(input:UpdatePassword):Promise<commonOutput>
}