import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { googleAuthLogin, loginOutput } from "../../domain/types/user";
import { JwtServiceImpl } from "../../services/JwtService";
import { Profile } from "passport-google-oauth20";

export class googlAuthUseCase {
   private jwtService : JwtServiceImpl
   private userRepository: IUserRepository
   constructor(userRepository: IUserRepository,jwtService : JwtServiceImpl) {
      this.userRepository = userRepository
      this.jwtService = jwtService
   }
    async execute(profile: Profile): Promise<loginOutput> {
    const email = profile.emails?.[0].value || "";
    const username = profile.displayName || "google-user";
    const googleId = profile.id;
    let user = await this.userRepository.findUserBygoogleId(googleId);
    if (user) {
       const tokens = this.jwtService.generateTokens(user._id,user.email)

      return {
         success: true,
         message: "Login successfully",
         tokens
      }
    }     
    await this.userRepository.createUser(username,email,googleId);
    return {
      success:true,
      message:"user created successfully "
    }
  }
}