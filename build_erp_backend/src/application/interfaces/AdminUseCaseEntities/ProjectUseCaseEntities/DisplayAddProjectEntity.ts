import { commonOutput } from "../../../dto/CommonEntities/common";
import { userOutput } from "../../../dto/UserEntities/user";

export interface IDisplayAddProjectUseCaseEntity {
   execute(): Promise<userOutput | commonOutput>
}