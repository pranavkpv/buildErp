import { IUserRepository } from "../../Entities/repositoryEntities/User-management/IUserRepository";
import { User } from "../../Entities/Input-OutputEntities/UserEntities/user";
import { userDB } from "../../Database/Model/Usermodel";
import { tempUserDB } from "../../Database/Model/TempUsermodel";
import { IUserModelEntity } from "../../Entities/ModelEntities/User.Entity";
import { ITempUserModelEntity } from "../../Entities/ModelEntities/TempUser.Entity";


export class UserRepository implements IUserRepository {
   async findUserByEmail(email: string): Promise<IUserModelEntity | null> {
      const existUser = await userDB.findOne({ email })
      return existUser 
   }
   async findUserByPhone(phone: number): Promise<IUserModelEntity | null> {
      const existPhone = await userDB.findOne({ phone })
      return existPhone 
   }
   async saveUser(user: Omit<User, "_id" | "profile_image" | "otp" | "otpCreatedAt" | "createdAt" | "updatedAt">): Promise<IUserModelEntity> {
      const newUser = new userDB(user)
      const savedUser = await newUser.save()
      return savedUser.toObject()
   }
   async otpSave(user: Omit<User, "_id" | "profile_image" | "updatedAt" | "createdAt">): Promise<void> {
      const newTempUser = new tempUserDB(user)
      await newTempUser.save()
   }
   async findTempUserByEmailAndOTP(email: string, otp: string): Promise<ITempUserModelEntity | null> {
      const ExistUser = await tempUserDB.findOne({ email, otp })
      return ExistUser 
   }
   async findTempUserByEmail(email: string): Promise<ITempUserModelEntity | null> {
      const existEmail = await tempUserDB.findOne({ email })
      return existEmail 
   }
   async deleteTempUserByEmail(email: string): Promise<void> {
      await tempUserDB.deleteOne({ email })
   }
   async findTempUserByEmailAndUpdateOTP(email: string, otp: number,otpCreatedAt:Date): Promise<void > {
      const ResendTemp = await tempUserDB.findOneAndUpdate({ email: email }, { $set: { otp, otpCreatedAt } })
   }
   async findAllUser(): Promise<IUserModelEntity[] | []> {
      const userData = await userDB.find();
      return userData 
   }
   async findUserById(_id: string): Promise<IUserModelEntity | null> {
       const userData = await userDB.findById(_id)
       return userData 
   }
   async findUserBygoogleId(googleId: string): Promise<IUserModelEntity | null> {
       const userData = await userDB.findOne({googleId:googleId})
       return userData
   }
   async createUser(username: string, email: string, googleId: string): Promise<void> {
       const newUser = new userDB({
         username,
         email,
         googleId,
         password:"googleAuth001",
         phone:7000000000
       })
       await newUser.save()
   }
   async updatePassword(_id: string, password: string): Promise<void> {
       await userDB.findByIdAndUpdate(_id,{password})
   }
   async UpdateProfile(_id: string, username: string, email: string, phone: number): Promise<void> {
       await userDB.findByIdAndUpdate(_id,{username,email,phone})
   }
}