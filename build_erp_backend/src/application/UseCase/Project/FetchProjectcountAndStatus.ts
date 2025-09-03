import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { IProjectmapper } from "../../../domain/IMappers/IProject.mapper";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { displayStatusCountDTO } from "../../dto/project.dto";
import { IFetchProjectCountandStatusUseCase } from "../../IUseCases/IProject/IFetchProjectCountandStatus";

export class FetchProjectCountandStatusUseCase implements IFetchProjectCountandStatusUseCase {
   constructor(
      private _projectRespository: IprojectRepository,
      private _projectmapper: IProjectmapper
   ) { }
   async execute(): Promise<commonOutput<displayStatusCountDTO[]> | commonOutput> {
      const data = await this._projectRespository.getGroupProjectByStatus()
      const mappedData = this._projectmapper.toStatusCountDto(data)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH,mappedData)
   }
}