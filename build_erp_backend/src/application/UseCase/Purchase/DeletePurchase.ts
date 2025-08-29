import { IDeletePurchaseUseCase } from '../../IUseCases/IPurchase/IDeletePurchase';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { IPurchaseRepository } from '../../../domain/Entities/IRepository/IPurchase';
import { commonOutput } from '../../dto/common';
import { PurchaseSuccessMessage } from '../../../Shared/Messages/Purchase.Message';

export class DeletePurchaseUseCase implements IDeletePurchaseUseCase {
    constructor(
      private _purchaseRepository: IPurchaseRepository,
    ) { }
    async execute(id: string): Promise<commonOutput> {
        await this._purchaseRepository.deletePurchaseById(id);
        return ResponseHelper.success(PurchaseSuccessMessage.DELETE);
    }
}