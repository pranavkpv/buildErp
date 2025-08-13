import { inputAdmin } from "../../../../DTO/AdminEntities/admin";
import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IAdminLoginUseCaseEntity{
   execute(input:inputAdmin):Promise<commonOutput>
}