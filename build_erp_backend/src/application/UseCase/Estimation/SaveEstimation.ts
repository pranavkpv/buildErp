import { ISaveEstimationUseCase } from '../../IUseCases/IEstimation/ISaveEstimation';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { EstimationFailedMessage, EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { saveEstimationInput } from '../../entities/estimation.entity';
import { commonOutput } from '../../dto/common';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { Role } from '../../../Shared/Constants/Role.constant';


export class SaveEstimationUseCase implements ISaveEstimationUseCase {
    constructor(
        private _estimationRepository: IEstimationRepository,
        private _projectRepository: IprojectRepository,
    ) { }
    async execute(input: { projectId: string, row: saveEstimationInput[] }):
        Promise<commonOutput> {
        const projectId = input.projectId;
        const specDetails = input.row;
        const projectById = await this._projectRepository.getProjectById(projectId);
        if (projectById?.estimateBy !== Role.ADMIN) {
            return ResponseHelper.conflictData(EstimationFailedMessage.NOT_ACCESS);
        }
        const existEstimation = await this._estimationRepository.getEstimationsByProjectId(projectId);
        if (existEstimation.length > 0) {
            return ResponseHelper.conflictData(EstimationFailedMessage.ALREADY_DONE);
        }
        await this._estimationRepository.createEstimation(specDetails, projectId);
        return ResponseHelper.createdSuccess(EstimationSuccessMessage.ADD);
    }
}