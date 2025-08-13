import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { userSignupInput } from "../../../../DTO/UserEntities/user";

export interface ISignupUserUseCaseEntity{
   execute(input: userSignupInput): Promise<commonOutput>
}