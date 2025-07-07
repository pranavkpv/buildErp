import { Admin } from "../types/admin";

export interface IAdminRepository{
   findAdminByUsernameAndPassword(username:string,password:string):Promise<Admin | null>;
   findAdminById(_id:string):Promise<Admin | null>;
}