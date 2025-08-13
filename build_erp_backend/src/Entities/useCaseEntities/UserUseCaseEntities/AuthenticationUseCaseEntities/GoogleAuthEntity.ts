import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { googleAuthLogin } from "../../../../DTO/UserEntities/GoogleAuth";

export interface IgooglAuthUseCaseEntity {
    execute(input:googleAuthLogin): Promise<commonOutput> 
}