import { IprojectRepository } from "../../../domain/repositories/IProjectRepository"
import { deleteProjectInput, outputProject } from "../../../domain/types/project"


export class DeleteProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(input: deleteProjectInput): Promise<outputProject> {
      const { _id } = input
      await this.projectRepository.DeleteProjectById(_id)
      return {
         success: true,
         message: "project deleted successfully"
      }
   }
}
