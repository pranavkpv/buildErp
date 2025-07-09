import { User } from "../types/user";

export interface IUserRepository{
   findUserByEmail(email:string):Promise<User | null>;
   findUserByPhone(phone:number):Promise<User | null>;
   saveUser(user:Omit<User,"_id" |"profile_image"|"otp"|"otpCreatedAt"|"createdAt"|"updatedAt">):Promise<User>;
   //tempUser save
   otpSave(user:Omit<User,"_id"|"profile_image"|"updatedAt"|"createdAt">):Promise<void>;
   //verifying OTP
   findTempUserByEmailAndOTP(email:string,otp:string):Promise<User | null>;
   findTempUserByEmail(email:string):Promise<User | null>;
   deleteTempUserByEmail(email:string):Promise<void>;
   //resendOTP
   findTempUserByEmailAndUpdateOTP(email:string,otp:number,otpCreatedAt:Date):Promise<User | null>;
   findAllUser():Promise<User[] | []>;
   findUserById(_id:string):Promise<User | null>;
   //google Auth
   findUserBygoogleId(googleId:string):Promise<User | null>;
   createUser(username:string,email:string,googleId:string):Promise<void>;
   updatePassword(_id:string,password:string):Promise<void>

}