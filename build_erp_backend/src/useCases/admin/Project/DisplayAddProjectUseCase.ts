import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository"
import { IDisplayAddProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAddProjectEntity"
import { IUserModelEntity } from "../../../Entities/ModelEntities/User.Entity"


export class DisplayAddProjectUseCase implements IDisplayAddProjectUseCase {
   private userRepository: IUserRepository
   constructor(userRepository: IUserRepository) {
      this.userRepository = userRepository
   }
   async execute(): Promise<IUserModelEntity[] | []> {
      const userData = await this.userRepository.findAllUser()
      return userData 
   }
}
