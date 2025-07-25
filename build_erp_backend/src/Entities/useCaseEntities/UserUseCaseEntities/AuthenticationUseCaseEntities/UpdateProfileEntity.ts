import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { UpdateProfile } from "../../../Input-OutputEntities/UserEntities/user";

export interface IUpdateProfileUseCase{
   execute(input:UpdateProfile) : Promise<commonOutput>
}