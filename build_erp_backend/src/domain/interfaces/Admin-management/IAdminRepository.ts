import { inputAdmin } from "../../../application/dto/AdminEntities/admin";
import { IAdminModelEntity } from "../../Entities/modelEntities/admin.entity";


export interface IAdminRepositoryEntity {
   findAdminByUsernameAndPassword(input: inputAdmin): Promise<IAdminModelEntity | null>;
   findAdminById(_id: string): Promise<IAdminModelEntity | null>;
}