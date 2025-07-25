import { User } from "../../Input-OutputEntities/UserEntities/user";
import { ITempUserModelEntity } from "../../ModelEntities/TempUser.Entity";
import { IUserModelEntity } from "../../ModelEntities/User.Entity";


export interface IUserRepository{
   findUserByEmail(email:string):Promise<IUserModelEntity | null>;
   findUserByPhone(phone:number):Promise<IUserModelEntity | null>;
   saveUser(user:Omit<User,"_id" |"profile_image"|"otp"|"otpCreatedAt"|"createdAt"|"updatedAt">):Promise<IUserModelEntity>;
   //tempUser save
   otpSave(user:Omit<User,"_id"|"profile_image"|"updatedAt"|"createdAt">):Promise<void>;
   //verifying OTP
   findTempUserByEmailAndOTP(email:string,otp:string):Promise<ITempUserModelEntity | null>;
   findTempUserByEmail(email:string):Promise<ITempUserModelEntity | null>;
   deleteTempUserByEmail(email:string):Promise<void>;
   //resendOTP
   findTempUserByEmailAndUpdateOTP(email:string,otp:number,otpCreatedAt:Date):Promise<void>;
   findAllUser():Promise<IUserModelEntity[] | []>;
   findUserById(_id:string):Promise<IUserModelEntity | null>;
   findUserBygoogleId(googleId:string):Promise<IUserModelEntity | null>;
   createUser(username:string,email:string,googleId:string):Promise<void>;
   updatePassword(_id:string,password:string):Promise<void>
   UpdateProfile(_id:string,username:string,email:string,phone:number):Promise<void>
   UpdateProfileImage(url:string,_id:string):Promise<void>
}