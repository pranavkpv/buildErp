import { adminDB } from "../../api/models/AdminModel";
import { inputAdmin } from "../../application/Entities/admin.entity";
import { IAdminModelEntity } from "../../domain/Entities/modelEntities/admin.entity";
import { IAdminRepository } from "../../domain/Entities/IRepository/IAdmin";

export class AdminRepository implements IAdminRepository {

  // Get admin by username and password (used for login/verification)
  async getAdminByCredentials(input: inputAdmin): Promise<IAdminModelEntity | null> {
    const { username, password } = input;
    return await adminDB.findOne({ username, password });
  }

  // Get admin by their unique ID
  async getAdminById(_id: string): Promise<IAdminModelEntity | null> {
    return await adminDB.findById(_id);
  }
}

