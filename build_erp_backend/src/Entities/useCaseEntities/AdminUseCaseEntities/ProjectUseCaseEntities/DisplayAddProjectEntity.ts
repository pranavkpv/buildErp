import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { IUserModelEntity } from "../../../ModelEntities/User.Entity";

export interface IDisplayAddProjectUseCase {
   execute(): Promise<IUserModelEntity[] | [] | commonOutput>
}