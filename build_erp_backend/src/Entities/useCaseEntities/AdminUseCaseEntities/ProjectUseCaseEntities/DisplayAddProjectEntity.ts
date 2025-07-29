import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { userOutput } from "../../../Input-OutputEntities/UserEntities/user";

export interface IDisplayAddProjectUseCase {
   execute(): Promise<userOutput | commonOutput>
}