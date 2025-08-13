import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface ISendOTPUseCaseEntity{
   execute(input: { email: string }):Promise<commonOutput>
}