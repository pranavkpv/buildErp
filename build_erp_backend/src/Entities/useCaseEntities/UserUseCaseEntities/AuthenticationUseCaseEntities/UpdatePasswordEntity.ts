import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IUpdatePasswordUseCaseEntity {
   execute(input: { email: string, password: string }):Promise<commonOutput>
}