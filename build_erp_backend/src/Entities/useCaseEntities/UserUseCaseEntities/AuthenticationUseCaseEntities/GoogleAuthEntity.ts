import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { googleAuthLogin } from "../../../Input-OutputEntities/UserEntities/GoogleAuth";

export interface IgooglAuthUseCase {
    execute(input:googleAuthLogin): Promise<commonOutput> 
}