import { ITransferRepository } from '../../../domain/Entities/IRepository/ITransfer';
import { TransferSuccessMessage } from '../../../Shared/Messages/Transfer.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IRejectTransferUsecase } from '../../IUseCases/ITransfer/IRejectTransfer';

export class RejectTransferUseCase implements IRejectTransferUsecase {
    constructor(
      private _transferRepository: ITransferRepository,
    ) { }
    async execute(transferId: string): Promise<commonOutput> {
        await this._transferRepository.rejectTransfer(transferId);
        return ResponseHelper.success(TransferSuccessMessage.REJECT);
    }
}