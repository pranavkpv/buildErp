import { commonOutput } from "../../dto/common";
import { changePasswordInput } from "../../Entities/sitemanager.entity";


export interface IUpdateSitemanagerPasswordUseCase {
   execute(input: changePasswordInput): Promise<commonOutput>
}