import { IApproveTransferUseCase } from '../../IUseCases/ITransfer/IApproveTransfer';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { TransferFailedMessage, TransferSuccessMessage } from '../../../Shared/Messages/Transfer.Message';
import { ITransferRepository } from '../../../domain/Entities/IRepository/ITransfer';
import { IProjectStockRepository } from '../../../domain/Entities/IRepository/IProjectStock';
import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { transferInput } from '../../Entities/transfer.entity';
import { commonOutput } from '../../dto/common';
import { IPaymentRepostory } from '../../../domain/Entities/IRepository/IPayment';
import { IStageRepository } from '../../../domain/Entities/IRepository/IStage';

export class ApproveTransferUseCase implements IApproveTransferUseCase {
    constructor(
        private _transferRepository: ITransferRepository,
        private _projectStockRepository: IProjectStockRepository,
        private _materialRepository: IMaterialRepository,
        private _projectRepository: IprojectRepository,
        private _paymentRepository: IPaymentRepostory,
        private _stageRepository: IStageRepository
    ) { }
    async execute(input: transferInput): Promise<commonOutput> {
        if (!input._id) return ResponseHelper.badRequest(TransferFailedMessage.ID_NOT_MATCH);
        for (const element of input.materialDetails) {
            const ToProjectStock = await this._projectStockRepository.getStockQuantityByProjectAndMaterial({ material_id: element.material_id, project_id: input.from_project_id, quantity: 0 }) || 0;
            const materialData = await this._materialRepository.getMaterialById(element.material_id);
            const projectData = await this._projectRepository.getProjectById(input.from_project_id);
            if (ToProjectStock < element.quantity) {
                return ResponseHelper.conflictData(TransferFailedMessage.STOCK_EXCEED + materialData?.material_name + ' and ' + projectData?.project_name);
            }
        }
        await this._transferRepository.approveTransfer(input._id);
        for (const char of input.materialDetails) {
            await this._projectStockRepository.decreaseStock({ material_id: char.material_id, project_id: input.from_project_id, quantity: char.quantity });
        }
        const stageData = (await this._stageRepository.findStageByprojectId(input.from_project_id)).find((element) => element.progress != 100)
        if (!stageData) {
            const sumofTransferAmount = input.materialDetails.reduce((sum, element) => sum += (element.quantity * element.unit_rate), 0)
            await this._paymentRepository.createCheckoutSession({
                date: new Date(), amount: sumofTransferAmount, paymentMethod: 'wallet',
                purpose: 'Transfer Payment', paymentStatus: 'verified', stage_id: "", stripeSessionId: ""
            })
            return ResponseHelper.success(TransferSuccessMessage.APPROVE);
        }
        const sumofTransferAmount = input.materialDetails.reduce((sum, element) => sum += (element.quantity * element.unit_rate), 0)
        await this._paymentRepository.createCheckoutSession({
            date: new Date(), amount: sumofTransferAmount, paymentMethod: 'wallet',
            purpose: 'Transfer Payment', paymentStatus: 'verified', stage_id: stageData._id, stripeSessionId: ""
        })
        return ResponseHelper.success(TransferSuccessMessage.APPROVE);
    }
}
