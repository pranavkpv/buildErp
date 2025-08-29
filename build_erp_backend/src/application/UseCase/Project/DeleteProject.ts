import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IProjectStockRepository } from '../../../domain/Entities/IRepository/IProjectStock';
import { ProjectFailedMessage, ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IDeleteProjectUseCase } from '../../IUseCases/IProject/IDeleteProject';


export class DeleteProjectUseCase implements IDeleteProjectUseCase {
    constructor(
        private _projectRepository: IprojectRepository,
        private _projectStockRepository: IProjectStockRepository,
        private _estimationRepository: IEstimationRepository,
    ) { }
    async execute(id: string): Promise<commonOutput> {
        const existProjectInMaterial = await this._projectStockRepository.getProjectStockById(id);
        const existProjectInEstimation = await this._estimationRepository.getEstimationsByProjectId(id);
        if (existProjectInMaterial || existProjectInEstimation.length > 0) {
            return ResponseHelper.conflictData(ProjectFailedMessage.ALREADY_USED);
        }
        await this._projectRepository.DeleteProjectById(id);
        return ResponseHelper.success(ProjectSuccessMessage.DELETE);
    }
}
