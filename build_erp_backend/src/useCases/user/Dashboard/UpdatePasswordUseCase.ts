import { IHasher } from "../../../domain/repositories/IHasher";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class UpdatePasswordUseCase {
   private userRepository: IUserRepository
   private hasher : IHasher
   constructor(userRepository: IUserRepository,hasher : IHasher) {
      this.userRepository = userRepository
      this.hasher = hasher
   }
   async execute(input: { email: string, password: string }) {
      const { email, password } = input
      const existUser = await this.userRepository.findUserByEmail(email)
      if (!existUser) {
         return {
            success: false,
            message: "User not exist"
         }
      }
       const hashedPass = await this.hasher.hash(password)
      await this.userRepository.updatePassword(existUser._id,hashedPass)
       return {
            success: true,
            message: "password updated successfully"
         }

   }
}