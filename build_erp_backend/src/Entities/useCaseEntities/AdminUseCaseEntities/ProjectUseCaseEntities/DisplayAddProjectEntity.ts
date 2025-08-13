import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { userOutput } from "../../../../DTO/UserEntities/user";

export interface IDisplayAddProjectUseCaseEntity {
   execute(): Promise<userOutput | commonOutput>
}