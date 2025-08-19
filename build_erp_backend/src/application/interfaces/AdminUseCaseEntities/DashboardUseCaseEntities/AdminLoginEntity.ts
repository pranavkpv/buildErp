import { inputAdmin } from "../../../dto/AdminEntities/admin";
import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IAdminLoginUseCaseEntity{
   execute(input:inputAdmin):Promise<commonOutput>
}