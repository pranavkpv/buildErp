import { userDB } from "../../Database/Model/Usermodel";
import { tempUserDB } from "../../Database/Model/TempUsermodel";
import { IUserModelEntity } from "../../Entities/ModelEntities/User.Entity";
import { ITempUserModelEntity } from "../../Entities/ModelEntities/TempUser.Entity";
import { User } from "../../DTO/UserEntities/user";
import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository";

export class UserRepository implements IUserRepositoryEntity {
   // Find user by email
   async findUserByEmail(email: string): Promise<IUserModelEntity | null> {
      const existUser = await userDB.findOne({ email })
      return existUser
   }

   // Find non-GoogleAuth user by email
   async findAuthUserByEmail(email: string): Promise<IUserModelEntity | null> {
      const existUser = await userDB.findOne({ email, password: { $ne: "googleAuth001" } })
      return existUser
   }

   // Find GoogleAuth user by email
   async findExistAuthUser(email: string): Promise<IUserModelEntity | null> {
      const existUser = await userDB.findOne({ email, password: "googleAuth001" })
      return existUser
   }

   // Find user by phone number
   async findUserByPhone(phone: number): Promise<IUserModelEntity | null> {
      const existPhone = await userDB.findOne({ phone })
      return existPhone
   }

   // Save new user
   async saveUser(user: Omit<User, "_id" | "profile_image" | "otp" | "otpCreatedAt" | "createdAt" | "updatedAt">): Promise<IUserModelEntity> {
      const newUser = new userDB(user)
      const savedUser = await newUser.save()
      return savedUser.toObject()
   }

   // Save OTP for temporary user
   async otpSave(user: Omit<User, "_id" | "profile_image" | "updatedAt" | "createdAt">): Promise<void> {
      const newTempUser = new tempUserDB(user)
      await newTempUser.save()
   }

   // Find temporary user by email and OTP
   async findTempUserByEmailAndOTP(email: string, otp: string): Promise<ITempUserModelEntity | null> {
      const ExistUser = await tempUserDB.findOne({ email, otp })
      return ExistUser
   }

   // Find temporary user by email
   async findTempUserByEmail(email: string): Promise<ITempUserModelEntity | null> {
      const existEmail = await tempUserDB.findOne({ email })
      return existEmail
   }

   // Delete temporary users by email
   async deleteTempUserByEmail(email: string): Promise<void> {
      await tempUserDB.deleteMany({ email })
   }

   // Update OTP for temporary user by email
   async findTempUserByEmailAndUpdateOTP(email: string, otp: number, otpCreatedAt: Date): Promise<void> {
      await tempUserDB.findOneAndUpdate({ email: email }, { $set: { otp, otpCreatedAt } })
   }

   // Get all users
   async findAllUser(): Promise<IUserModelEntity[] | []> {
      const userData = await userDB.find();
      return userData
   }

   // Find user by ID
   async findUserById(_id: string): Promise<IUserModelEntity | null> {
      const userData = await userDB.findById(_id)
      return userData
   }

   // Create new GoogleAuth user
   async createUser(email: string, username: string, profile_image: string): Promise<void> {
      const newUser = new userDB({
         username,
         email,
         profile_image,
         password: "googleAuth001"
      })
      await newUser.save()
   }

   // Update password by user ID
   async updatePassword(_id: string, password: string): Promise<void> {
      await userDB.findByIdAndUpdate(_id, { password })
   }

   // Update user profile details
   async UpdateProfile(_id: string, username: string, email: string, phone: number): Promise<void> {
      await userDB.findByIdAndUpdate(_id, { username, email, phone })
   }

   // Update user profile image
   async UpdateProfileImage(url: string, _id: string): Promise<void> {
      await userDB.findByIdAndUpdate(_id, { profile_image: url })
   }
}
