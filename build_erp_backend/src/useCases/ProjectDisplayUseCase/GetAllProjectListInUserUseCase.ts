import { commonOutput } from "../../DTO/CommonEntities/common";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IGetAllProjectListInUserUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/GetAllProjectListInUserUseCaseEntity";
import { ProjectSuccessMessage } from "../../Shared/Messages/Project.Message";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";

export class GetAllProjectListInUserUseCase implements IGetAllProjectListInUserUseCaseEntity{
   private projectRepository : IprojectRepositoryEntity
   constructor(projectRepository : IprojectRepositoryEntity){
      this.projectRepository = projectRepository
   }
   async execute(): Promise<commonOutput> {
       const projectList = await this.projectRepository.fetchProject()
       const mappedProjectData = projectList.map((project)=>({
          _id:project._id,
          project_name:project.project_name,
          expected_image:project.expected_image,
          finalImage : project.finalImage,
          area:project.area,
          address:project.address,
          status:project.status,
          description:project.description,
          latitude:project.latitude,
          longitude:project.longitude
       }))

       return ResponseHelper.success(ProjectSuccessMessage.FETCH,mappedProjectData)
   }
}