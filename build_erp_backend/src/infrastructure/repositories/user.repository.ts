import { userDB } from "../../api/models/Usermodel";
import { tempUserDB } from "../../api/models/TempUsermodel";
import { IUserModelEntity } from "../../domain/Entities/modelEntities/user.entity";
import { ITempUserModelEntity } from "../../domain/Entities/modelEntities/tempUser.entity";
import { IUserRepository } from "../../domain/interfaces/User-management/IUserRepository";
import { googleLoginInput, updateprofileInput, userSignupinput, usertempSaveInput } from "../../application/entities/user.entity";

export class UserRepository implements IUserRepository {
   // User finders
   async getUserByEmail(email: string): Promise<IUserModelEntity | null> {
      const existUser = await userDB.findOne({ email })
      return existUser
   }
   async getUserByPhone(phone: number): Promise<IUserModelEntity | null> {
      const existPhone = await userDB.findOne({ phone })
      return existPhone
   }
   async getUserById(_id: string): Promise<IUserModelEntity | null> {
      const userData = await userDB.findById(_id)
      return userData
   }
   async getAllUsers(): Promise<IUserModelEntity[] | []> {
      const userData = await userDB.find();
      return userData
   }

   // Auth-specific user finders
   async getAuthUserByEmail(email: string): Promise<IUserModelEntity | null> {
      const existUser = await userDB.findOne({ email, password: { $ne: "googleAuth001" } })
      return existUser
   }
   async checkUserExistsByEmail(email: string): Promise<IUserModelEntity | null> {
      const existUser = await userDB.findOne({ email, password: "googleAuth001" })
      return existUser
   }

   // User mutations
   async createUser(input: userSignupinput): Promise<IUserModelEntity> {
      const newUser = new userDB(input)
      const savedUser = await newUser.save()
      return savedUser.toObject()
   }
   async updateUserPassword(_id: string, password: string): Promise<void> {
      await userDB.findByIdAndUpdate(_id, { password })
   }
   async updateUserProfile(input: Omit<updateprofileInput, "password">): Promise<void> {
      const { _id, username, email, phone } = input
      await userDB.findByIdAndUpdate(_id, { username, email, phone })
   }
   async updateUserProfileImage(url: string, _id: string): Promise<void> {
      await userDB.findByIdAndUpdate(_id, { profile_image: url })
   }

   // Temp user (OTP flow)
   async saveTempUser(user: usertempSaveInput): Promise<void> {
      const newTempUser = new tempUserDB(user)
      await newTempUser.save()
   }
   async getTempUserByEmail(email: string): Promise<ITempUserModelEntity | null> {
      const existEmail = await tempUserDB.findOne({ email })
      return existEmail
   }
   async getTempUserByEmailAndOTP(email: string, otp: string): Promise<ITempUserModelEntity | null> {
      const ExistUser = await tempUserDB.findOne({ email, otp })
      return ExistUser
   }
   async deleteTempUserByEmail(email: string): Promise<void> {
      await tempUserDB.deleteMany({ email })
   }
   async updateTempUserOTP(input: Pick<usertempSaveInput, "email" | "otp" | "otpCreatedAt">): Promise<void> {
      const { email, otp, otpCreatedAt } = input
      await tempUserDB.findOneAndUpdate({ email: email }, { $set: { otp, otpCreatedAt } })
   }
   async createGoogleUser(input: googleLoginInput): Promise<void> {
      const { email, username, profile_image } = input
      const newUser = new userDB({
         email,
         username,
         profile_image,
         password: "googelAuthpassword"
      })
      await newUser.save()
   }
}
