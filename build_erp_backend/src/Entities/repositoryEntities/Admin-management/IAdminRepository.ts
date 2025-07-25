import { Admin } from "../../Input-OutputEntities/AdminEntities/admin";
import { IAdminModelEntity } from "../../ModelEntities/Admin.Entity";


export interface IAdminRepository{
   findAdminByUsernameAndPassword(username:string,password:string):Promise<IAdminModelEntity | null>;
   findAdminById(_id:string):Promise<IAdminModelEntity | null>;
}