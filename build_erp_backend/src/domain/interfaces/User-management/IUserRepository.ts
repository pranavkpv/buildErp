import { googleLoginInput, updateprofileInput, userSignupinput, usertempSaveInput } from "../../../application/entities/user.entity";
import { ITempUserModelEntity } from "../../Entities/modelEntities/tempUser.entity";
import { IUserModelEntity } from "../../Entities/modelEntities/user.entity";

export interface IUserRepository {
   // User finders
   getUserByEmail(email: string): Promise<IUserModelEntity | null>;
   getUserByPhone(phone: number): Promise<IUserModelEntity | null>;
   getUserById(_id: string): Promise<IUserModelEntity | null>;
   getAllUsers(): Promise<IUserModelEntity[]>;

   // Auth-specific user finders
   getAuthUserByEmail(email: string): Promise<IUserModelEntity | null>;
   checkUserExistsByEmail(email: string): Promise<IUserModelEntity | null>;

   // User mutations
   createUser(input: userSignupinput): Promise<IUserModelEntity>;
   createGoogleUser(input:googleLoginInput): Promise<void>
   updateUserPassword(_id: string, password: string): Promise<void>;
   updateUserProfile(input:Omit<updateprofileInput, "password">): Promise<void>;
   updateUserProfileImage(_id: string, url: string): Promise<void>;

   // Temp user (OTP flow)
   saveTempUser(input: usertempSaveInput): Promise<void>;
   getTempUserByEmail(email: string): Promise<ITempUserModelEntity | null>;
   getTempUserByEmailAndOTP(email: string, otp: string): Promise<ITempUserModelEntity | null>;
   updateTempUserOTP(input: Pick<usertempSaveInput, "email" | "otp" | "otpCreatedAt">): Promise<void>;
   deleteTempUserByEmail(email: string): Promise<void>;
}
