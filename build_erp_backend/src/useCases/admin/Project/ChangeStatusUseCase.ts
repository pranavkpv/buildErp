import { IprojectRepository } from "../../../domain/repositories/IProjectRepository"
import { outputProject, statusChangeInput } from "../../../domain/types/project"


export class ChangeStatusUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(input: statusChangeInput): Promise<outputProject> {
      const { _id, status } = input
      await this.projectRepository.changeProjectStatus(_id, status)
      return {
         success: true,
         message: "status changed successfully to " + status

      }
   }
}

