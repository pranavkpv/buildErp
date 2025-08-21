import { adminDB } from "../../api/models/AdminModel";
import { inputAdmin } from "../../application/entities/admin.entity";
import { IAdminModelEntity } from "../../domain/Entities/modelEntities/admin.entity";
import { IAdminRepositoryEntity } from "../../domain/interfaces/Admin-management/IAdminRepository";

/**
 * Repository class for Admin-related database operations.
 * Implements methods to fetch admin details based on different criteria.
 */
export class AdminRepository implements IAdminRepositoryEntity {

  /**
   * Finds an admin by matching both username and password.
   * 
   * @param input - Object containing `username` and `password`.
   * @returns The matching admin document or null if not found.
   */
  async findAdminByUsernameAndPassword(
    input: inputAdmin
  ): Promise<IAdminModelEntity | null> {
    const { username, password } = input;
    return await adminDB.findOne({ username, password });
  }

  /**
   * Finds an admin by their unique ID.
   * 
   * @param _id - The admin's unique MongoDB ObjectId.
   * @returns The matching admin document or null if not found.
   */
  async findAdminById(_id: string): Promise<IAdminModelEntity | null> {
    return await adminDB.findById(_id);
  }
}
