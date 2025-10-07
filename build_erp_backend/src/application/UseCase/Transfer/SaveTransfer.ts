import { ISaveTransferUseCase } from '../../IUseCases/ITransfer/ISaveTransfer';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { TransferFailedMessage, TransferSuccessMessage } from '../../../Shared/Messages/Transfer.Message';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { ITransferRepository } from '../../../domain/Entities/IRepository/ITransfer';
import { IProjectStockRepository } from '../../../domain/Entities/IRepository/IProjectStock';
import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { transferInput } from '../../entities/transfer.entity';
import { commonOutput } from '../../dto/common';
import { INotificationRepository } from '../../../domain/Entities/IRepository/INotification';
import { ProjectFailedMessage } from '../../../Shared/Messages/Project.Message';

export class SaveTransferUsecase implements ISaveTransferUseCase {
    constructor(
        private _transferRepository: ITransferRepository,
        private _projectStockRepository: IProjectStockRepository,
        private _materialRepository: IMaterialRepository,
        private _projectRepository: IprojectRepository,
        private _notificationRepository: INotificationRepository,
    ) { }
    async execute(input: transferInput): Promise<commonOutput> {
        const duplicateTransfer = await this._transferRepository.findTransferBytransferId(input.transfer_id);
        if (duplicateTransfer) {
            return ResponseHelper.conflictData(TransferFailedMessage.EXIST_TRANSFER);
        }
        for (const element of input.materialDetails) {
            const ToProjectStock = await this._projectStockRepository.getStockQuantityByProjectAndMaterial({ material_id: element.material_id, project_id: input.from_project_id, quantity: 0 }) || 0;
            const materialData = await this._materialRepository.getMaterialById(element.material_id);
            const projectData = await this._projectRepository.getProjectById(input.from_project_id);
            if (ToProjectStock < element.quantity) {
                return ResponseHelper.badRequest(TransferFailedMessage.STOCK_EXCEED + materialData?.material_name + ' and ' + projectData?.project_name);
            }
        }
        const response = await this._transferRepository.saveTransfer(input);
        if (!response) {
            return ResponseHelper.badRequest(TransferFailedMessage.SAVE);
        }
        const fromProjectData = await this._projectRepository.getProjectById(input.from_project_id);
        if (!fromProjectData){
            return ResponseHelper.conflictData(ProjectFailedMessage.FETCH);
        }
        await this._notificationRepository.saveNotication(new Date(), 'Admin have to send a material Transfer Request', fromProjectData.user_id,'transfer');
        return ResponseHelper.createdSuccess(TransferSuccessMessage.SAVE);
    }
}