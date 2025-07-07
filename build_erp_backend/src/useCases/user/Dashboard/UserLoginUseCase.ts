import { IHasher } from "../../../domain/repositories/IHasher"
import { IUserRepository } from "../../../domain/repositories/IUserRepository"
import { loginInput, loginOutput } from "../../../domain/types/user"
import { JwtServiceImpl } from "../../../services/JwtService"





export class UserLoginUseCase {
   private UserRepository: IUserRepository
   private Hasher: IHasher
   private jwtService : JwtServiceImpl
   constructor(UserRepository: IUserRepository, Hasher: IHasher,jwtService : JwtServiceImpl) {
      this.UserRepository = UserRepository
      this.Hasher = Hasher
      this.jwtService = jwtService
   }
   async execute(input: loginInput): Promise<loginOutput> {
      const { email, password } = input
      const existUser = await this.UserRepository.findUserByEmail(email)
      if (!existUser) {
         return {
            success: false,
            message: "Invalid email address. Please try again."
         }
      }
      const passwordCheck = await this.Hasher.compare(password, existUser.password)
      if (!passwordCheck) {
         return {
            success: false,
            message: "Invalid password. Please try again."
         }
      }

      const tokens = this.jwtService.generateTokens(existUser._id,existUser.email)

      return {
         success: true,
         message: "Login successfully",
         tokens
      }

   }

}

