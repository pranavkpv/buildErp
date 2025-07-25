
import { IAdminRepository } from "../../Entities/repositoryEntities/Admin-management/IAdminRepository";
import { Admin } from "../../Entities/Input-OutputEntities/AdminEntities/admin";
import { adminDB } from "../../Database/Model/AdminModel";
import { IAdminModelEntity } from "../../Entities/ModelEntities/Admin.Entity";

export class AdminRepository implements IAdminRepository{
      async findAdminByUsernameAndPassword(username:string,password:string):Promise<IAdminModelEntity | null>{
          const admin = await adminDB.findOne({username,password})
          return admin 
      }
      async findAdminById(_id: string): Promise<IAdminModelEntity | null> {
          const adminData = await adminDB.findById(_id)
          return adminData 
      }
}