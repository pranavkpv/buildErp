import { googleLoginInput, updateprofileInput, userSignupinput, usertempSaveInput } from '../../../application/Entities/user.entity';
import { ITempUserModelEntity } from '../modelEntities/tempUser.entity';
import { IUserModelEntity } from '../modelEntities/user.entity';

export interface IUserRepository {
   // User finders
   getUserByEmail(email: string): Promise<IUserModelEntity | null>;
   getUserByPhone(phone: number): Promise<IUserModelEntity | null>;
   getUserById(id: string): Promise<IUserModelEntity | null>;
   getAllUsers(): Promise<IUserModelEntity[]>;

   // Auth-specific user finders
   getAuthUserByEmail(email: string): Promise<IUserModelEntity | null>;
   checkUserExistsByEmail(email: string): Promise<IUserModelEntity | null>;

   // User mutations
   createUser(input: userSignupinput): Promise<IUserModelEntity>;
   createGoogleUser(input:googleLoginInput): Promise<void>
   updateUserPassword(id: string, password: string): Promise<void>;
   updateUserProfile(input:Omit<updateprofileInput, 'password'>): Promise<void>;
   updateUserProfileImage(id: string, url: string): Promise<void>;

   // Temp user (OTP flow)
   saveTempUser(input: usertempSaveInput): Promise<void>;
   getTempUserByEmail(email: string): Promise<ITempUserModelEntity | null>;
   updateTempUserOTP(input: Pick<usertempSaveInput, 'email' | 'otp' | 'otpCreatedAt'>): Promise<void>;
   deleteTempUserByEmail(email: string): Promise<void>;

   //store accessToken in blacklist
   blackListToken(accessToken:string):Promise<boolean>
}
