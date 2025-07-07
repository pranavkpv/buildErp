import { IprojectRepository } from "../../../domain/repositories/IProjectRepository"
import { addProjectInput, outputProject } from "../../../domain/types/project"


export class AddProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(input: addProjectInput): Promise<outputProject> {
      const { project_name, user_id, address, mobile_number, email, area, description } = input
      const existProject = await this.projectRepository.findProjectByName(project_name)
      if (existProject) {
         return {
            success: false,
            message: "project name already exist"
         }
      }
      const status = "pending"
      await this.projectRepository.saveProject(project_name, user_id, address, mobile_number, email, area, description, status)
      return {
         success: true,
         message: "project registered successfully"
      }
   }
}
