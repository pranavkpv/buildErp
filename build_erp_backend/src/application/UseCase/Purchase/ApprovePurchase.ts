import { IApprovePurchaseUseCase } from '../../IUseCases/IPurchase/IApprovePurchase';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { IPurchaseRepository } from '../../../domain/Entities/IRepository/IPurchase';
import { IProjectStockRepository } from '../../../domain/Entities/IRepository/IProjectStock';
import { purchaseInput } from '../../entities/purchase.entity';
import { commonOutput } from '../../dto/common';
import { PurchaseFailedMessage, PurchaseSuccessMessage } from '../../../Shared/Messages/Purchase.Message';

export class ApprovePurchaseUseCase implements IApprovePurchaseUseCase {
    constructor(
    private _purchaseRepository: IPurchaseRepository,
    private _projectStockRepository: IProjectStockRepository,
    ) { }
    async execute(input: purchaseInput): Promise<commonOutput> {
        if (!input._id) return ResponseHelper.badRequest(PurchaseFailedMessage.ID_NOT);
        await this._purchaseRepository.approvePurchaseById(input?._id);
        for (const char of input.materialDetails) {
            await this._projectStockRepository.increaseStock({ material_id: char.material_id, project_id: input.project_id, quantity: Number(char.quantity) });
        }
        return ResponseHelper.success(PurchaseSuccessMessage.APPROVE);
    }
}