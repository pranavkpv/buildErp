import { IUserModelEntity } from "../../../ModelEntities/User.Entity";

export interface IDisplayAddProjectUseCase {
   execute(): Promise<IUserModelEntity[] | []>
}