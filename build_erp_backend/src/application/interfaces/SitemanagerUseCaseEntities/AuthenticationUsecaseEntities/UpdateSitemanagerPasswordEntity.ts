import { commonOutput } from "../../../dto/common";
import { changePasswordInput } from "../../../entities/sitemanager.entity";


export interface IUpdateSitemanagerPasswordUseCase {
   execute(input: changePasswordInput): Promise<commonOutput>
}