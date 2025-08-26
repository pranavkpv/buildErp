import { inputAdmin } from "../../../application/Entities/admin.entity";
import { IAdminModelEntity } from "../modelEntities/admin.entity";


export interface IAdminRepository {
   getAdminByCredentials(input: inputAdmin):
      Promise<IAdminModelEntity | null>;

   getAdminById(_id: string):
      Promise<IAdminModelEntity | null>;
}