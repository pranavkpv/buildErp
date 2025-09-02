import { IAttendanceRepository } from '../../../domain/Entities/IRepository/IAttendance';
import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { IProjectStockRepository } from '../../../domain/Entities/IRepository/IProjectStock';
import { IPurchaseRepository } from '../../../domain/Entities/IRepository/IPurchase';
import { ITransferRepository } from '../../../domain/Entities/IRepository/ITransfer';
import { ProjectFailedMessage, ProjectSuccessMessage } from '../../../Shared/Messages/Project.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IDeleteProjectUseCase } from '../../IUseCases/IProject/IDeleteProject';


export class DeleteProjectUseCase implements IDeleteProjectUseCase {
    constructor(
        private _projectRepository: IprojectRepository,
        private _projectStockRepository: IProjectStockRepository,
        private _estimationRepository: IEstimationRepository,
        private _purchaseRepository: IPurchaseRepository,
        private _transferRepository: ITransferRepository,
        private _attendanceRepository: IAttendanceRepository

    ) { }
    async execute(id: string): Promise<commonOutput> {
        const existProjectInMaterial = await this._projectStockRepository.getProjectStockById(id);
        const existProjectInEstimation = await this._estimationRepository.getEstimationsByProjectId(id);
        const existInPurchase = await this._purchaseRepository.getPurchaseByProjectId(id)
        const existInTransfer = await this._transferRepository.getTransferByProjectId(id)
        const existInAttendance = await this._attendanceRepository.getAttendanceByProjectId(id)
        if (existInPurchase) {
            return ResponseHelper.conflictData(ProjectFailedMessage.USED_purchase)
        }
        if (existInTransfer) {
            return ResponseHelper.conflictData(ProjectFailedMessage.USED_TRANSFER)
        }
        if (existInAttendance) {
            return ResponseHelper.conflictData(ProjectFailedMessage.USED_ATTENDANCE)
        }
        if (existProjectInMaterial || existProjectInEstimation.length > 0) {
            return ResponseHelper.conflictData(ProjectFailedMessage.ALREADY_USED);
        }
        await this._projectRepository.DeleteProjectById(id);
        return ResponseHelper.success(ProjectSuccessMessage.DELETE);
    }
}
