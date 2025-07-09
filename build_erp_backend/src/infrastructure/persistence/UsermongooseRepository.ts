import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/types/user";
import TempUsermodel from "../../models/TempUsermodel";
import UserModel from "../../models/Usermodel";
export class UsermongooseRepository implements IUserRepository {
   async findUserByEmail(email: string): Promise<User | null> {
      const existUser = await UserModel.findOne({ email })
      return existUser ? (existUser as User) : null
   }
   async findUserByPhone(phone: number): Promise<User | null> {
      const existPhone = await UserModel.findOne({ phone })
      return existPhone ? (existPhone as User) : null
   }
   async saveUser(user: Omit<User, "_id" | "profile_image" | "otp" | "otpCreatedAt" | "createdAt" | "updatedAt">): Promise<User> {
      const newUser = new UserModel(user)
      const savedUser = await newUser.save()
      return savedUser.toObject() as User
   }
   async otpSave(user: Omit<User, "_id" | "profile_image" | "updatedAt" | "createdAt">): Promise<void> {
      const newTempUser = new TempUsermodel(user)
      await newTempUser.save()
   }
   async findTempUserByEmailAndOTP(email: string, otp: string): Promise<User | null> {
      const ExistUser = await TempUsermodel.findOne({ email, otp })
      return ExistUser ? (ExistUser as User) : null
   }
   async findTempUserByEmail(email: string): Promise<User | null> {
      const existEmail = await TempUsermodel.findOne({ email })
      return existEmail ? (existEmail as User) : null
   }
   async deleteTempUserByEmail(email: string): Promise<void> {
      await TempUsermodel.deleteOne({ email })
   }
   async findTempUserByEmailAndUpdateOTP(email: string, otp: number,otpCreatedAt:Date): Promise<User | null> {
      const ResendTemp = await TempUsermodel.findOneAndUpdate({ email: email }, { $set: { otp, otpCreatedAt } })
      return ResendTemp?.toObject() as User
   }
   async findAllUser(): Promise<User[] | []> {
      const userData = await UserModel.find();
      return userData ? userData : []
   }
   async findUserById(_id: string): Promise<User | null> {
       const userData = await UserModel.findById(_id)
       return userData ? userData : null
   }
   async findUserBygoogleId(googleId: string): Promise<User | null> {
       const userData = await UserModel.findOne({googleId:googleId})
       return userData ? userData : null
   }
   async createUser(username: string, email: string, googleId: string): Promise<void> {
       const newUser = new UserModel({
         username,
         email,
         googleId,
         password:"googleAuth001",
         phone:7000000000
       })
       await newUser.save()
   }
   async updatePassword(_id: string, password: string): Promise<void> {
       await UserModel.findByIdAndUpdate(_id,{password})
   }
}