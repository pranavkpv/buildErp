import { IPurchaseRepository } from '../../../domain/Entities/IRepository/IPurchase';
import { ISavePurchaseUseCase } from '../../IUseCases/IPurchase/ISavePurchase';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { purchaseInput } from '../../Entities/purchase.entity';
import { commonOutput } from '../../dto/common';
import { PurchaseFailedMessage, PurchaseSuccessMessage } from '../../../Shared/Messages/Purchase.Message';


export class SavePurchaseUseCase implements ISavePurchaseUseCase {
    constructor(
        private _purchaseRepository: IPurchaseRepository,
    ) { }
    async execute(input: purchaseInput): Promise<commonOutput> {
        const existInv = await this._purchaseRepository.getPurchaseByInvoice(input.invoice_number)
        if (existInv) {
            return ResponseHelper.conflictData(PurchaseFailedMessage.EXIST)
        }
        const response = await this._purchaseRepository.createPurchase(input);
        if (!response) {
            return ResponseHelper.badRequest(PurchaseFailedMessage.SAVE);
        }
        return ResponseHelper.createdSuccess(PurchaseSuccessMessage.SAVE);
    }
}