import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { UpdateProfile } from "../../../../DTO/UserEntities/user";

export interface IUpdateProfileUseCaseEntity{
   execute(input:UpdateProfile) : Promise<commonOutput>
}