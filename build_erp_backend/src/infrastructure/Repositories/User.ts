import { userDB } from "../../api/models/Usermodel";
import { tempUserDB } from "../../api/models/TempUsermodel";
import { IUserModelEntity } from "../../domain/Entities/modelEntities/user.entity";
import { ITempUserModelEntity } from "../../domain/Entities/modelEntities/tempUser.entity";
import { IUserRepository } from "../../domain/Entities/IRepository/IUser";
import redis from "../database/Redis";
import { googleLoginInput, updateprofileInput, userSignupinput, usertempSaveInput } from "../../application/Entities/user.entity";
import { googleAuthPassword } from "../../Shared/Constants/Character.constant";

export class UserRepository implements IUserRepository {
   //  Get a user by email 
   async getUserByEmail(email: string): Promise<IUserModelEntity | null> {
      const existUser = await userDB.findOne({ email })
      return existUser
   }
   // Get a user by phone number 
   async getUserByPhone(phone: number): Promise<IUserModelEntity | null> {
      const existPhone = await userDB.findOne({ phone })
      return existPhone
   }
   //  Get a user by unique ID 
   async getUserById(_id: string): Promise<IUserModelEntity | null> {
      const userData = await userDB.findById(_id)
      return userData
   }
   //  Get all registered users 
   async getAllUsers(): Promise<IUserModelEntity[] | []> {
      const userData = await userDB.find();
      return userData
   }

   // Get a non-Google-authenticated user by email 
   async getAuthUserByEmail(email: string): Promise<IUserModelEntity | null> {
      const existUser = await userDB.findOne({ email, password: { $ne: googleAuthPassword } })
      return existUser
   }
   //   Get a Google-authenticated user by email 
   async checkUserExistsByEmail(email: string): Promise<IUserModelEntity | null> {
      const existUser = await userDB.findOne({ email, password: googleAuthPassword })
      return existUser
   }

   //  Create and save a new user 
   async createUser(input: userSignupinput): Promise<IUserModelEntity> {
      const newUser = new userDB(input)
      const savedUser = await newUser.save()
      return savedUser.toObject()
   }
   //   Update user password 
   async updateUserPassword(_id: string, password: string): Promise<void> {
      await userDB.findByIdAndUpdate(_id, { password })
   }
   // Update user profile (excluding password) 
   async updateUserProfile(input: Omit<updateprofileInput, "password">): Promise<void> {
      const { _id, username, email, phone } = input
      await userDB.findByIdAndUpdate(_id, { username, email, phone })
   }
   // Update user profile image
   async updateUserProfileImage(url: string, _id: string): Promise<void> {
      await userDB.findByIdAndUpdate(_id, { profile_image: url })
   }

   // Save a temporary user in Redis for OTP verification 
   async saveTempUser(user: usertempSaveInput): Promise<void> {
      const key = `tempUser:${ user.email }`;

      await redis.hset(key, {
         username: user.username,
         email: user.email,
         phone: user.phone.toString(),
         password: user.password,
         otp: user.otp,
         otpCreatedAt: user.otpCreatedAt.toISOString(),
      });
      await redis.expire(key, 300);
   }

   //   Get a temporary user by email from Redis 
   async getTempUserByEmail(email: string): Promise<ITempUserModelEntity | null> {
      const key = `tempUser:${ email }`;
      const data = await redis.hgetall(key);
      if (Object.keys(data).length === 0) {
         return null;
      }

      const tempUser: ITempUserModelEntity = {
         _id: data._id || '',
         username: data.username,
         email: data.email,
         phone: Number(data.phone),
         password: data.password,
         otp: data.otp,
         otpCreatedAt: data.otpCreatedAt,
      };

      return tempUser;
   }
   // Get a temporary user by email and OTP from MongoDB 
   async getTempUserByEmailAndOTP(email: string, otp: string): Promise<ITempUserModelEntity | null> {
      const ExistUser = await tempUserDB.findOne({ email, otp })
      return ExistUser
   }
   // Delete a temporary user by email from Redis 
   async deleteTempUserByEmail(email: string): Promise<void> {
      const key = `tempUser:${ email }`
      await redis.del(key);
   }
   // Update OTP for a temporary user in Redis 
   async updateTempUserOTP(input: Pick<usertempSaveInput, "email" | "otp" | "otpCreatedAt">): Promise<void> {
      const key = `tempUser:${ input.email }`;
      await redis.hset(key, {
         otp: input.otp,
         otpCreatedAt: input.otpCreatedAt,
      });

   }
   // Create a new Google-authenticated user 
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
   //  Add a JWT token to the blacklist (stored in Redis)
   async blackListToken(accessToken: string): Promise<boolean> {
      await redis.set(`blackList:${ accessToken }`, "success")
      await redis.expire(`blackList:${ accessToken }`, 300);
      return true
   }
}
