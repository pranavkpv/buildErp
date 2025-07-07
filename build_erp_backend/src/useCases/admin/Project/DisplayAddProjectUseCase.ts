import { IUserRepository } from "../../../domain/repositories/IUserRepository"
import { User } from "../../../domain/types/user"


export class DisplayAddProjectUseCase {
   private userRepository: IUserRepository
   constructor(userRepository: IUserRepository) {
      this.userRepository = userRepository
   }
   async execute(): Promise<User[] | []> {
      const userData = await this.userRepository.findAllUser()
      return userData ? userData : []
   }
}
