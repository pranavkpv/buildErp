import { IUpdatePurchaseUseCase } from '../../IUseCases/IPurchase/IUpdatePurchase';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { purchaseInput } from '../../Entities/purchase.entity';
import { IPurchaseRepository } from '../../../domain/Entities/IRepository/IPurchase';
import { PurchaseFailedMessage, PurchaseSuccessMessage } from '../../../Shared/Messages/Purchase.Message';


export class UpdatePurchaseUseCase implements IUpdatePurchaseUseCase {
    constructor(
        private _purchaseRepository: IPurchaseRepository,
    ) { }
    async execute(input: purchaseInput): Promise<commonOutput> {
        const existInv = await this._purchaseRepository.getPurchaseByInvoice(input.invoice_number)
        if (existInv) {
            return ResponseHelper.conflictData(PurchaseFailedMessage.EXIST)
        }
        const response = await this._purchaseRepository.updatePurchase(input);
        if (!response) {
            return ResponseHelper.badRequest(PurchaseFailedMessage.UPDATE);
        }
        return ResponseHelper.success(PurchaseSuccessMessage.UPDATE);
    }
}