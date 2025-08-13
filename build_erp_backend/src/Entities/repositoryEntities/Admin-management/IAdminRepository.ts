import { inputAdmin } from "../../../DTO/AdminEntities/admin";
import { IAdminModelEntity } from "../../ModelEntities/Admin.Entity";


export interface IAdminRepositoryEntity {
   findAdminByUsernameAndPassword(input: inputAdmin): Promise<IAdminModelEntity | null>;
   findAdminById(_id: string): Promise<IAdminModelEntity | null>;
}