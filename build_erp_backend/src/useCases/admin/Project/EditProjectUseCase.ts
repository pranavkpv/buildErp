import { IprojectRepository } from "../../../domain/repositories/IProjectRepository"
import { editProjectInput, outputProject } from "../../../domain/types/project"


export class EditProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(input: editProjectInput): Promise<outputProject> {
      const { _id, project_name, user_id, address, mobile_number, email, area, description } = input
      const existData = await this.projectRepository.findProjectInEdit(_id, project_name)
      if (existData) {
         return {
            success: false,
            message: "project name already exist"
         }
      }
      await this.projectRepository.UpdateProjectById(_id, project_name, user_id, address, mobile_number, email, area, description)
      return {
         success: true,
         message: "project updated successfully"
      }
   }
}

