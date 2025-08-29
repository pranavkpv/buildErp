import { IUpdateReceiveUseCase } from '../../IUseCases/IReceive/IUpdateRecieve';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ReceiveFailedMessage, ReceiveSuccessMessage } from '../../../Shared/Messages/Receive.Message';
import { ReceiveInput } from '../../Entities/receive.entity';
import { commonOutput } from '../../dto/common';
import { IReceiveRepository } from '../../../domain/Entities/IRepository/IReceive';
import { ITransferRepository } from '../../../domain/Entities/IRepository/ITransfer';

export class UpdateReceiveUsecase implements IUpdateReceiveUseCase {
    constructor(
      private _receiveRepository: IReceiveRepository,
      private _transferRepository: ITransferRepository,
    ) { }
    async execute(input: ReceiveInput): Promise<commonOutput> {
        for (const element of input.transferId) {
            const transferData = await this._transferRepository.findTransferBytransferId(element);
            if (transferData) {
                if (new Date(transferData?.date) > new Date(input.date)) {
                    return ResponseHelper.conflictData(ReceiveFailedMessage.GREATER_DATE);
                }
            }
        }
        const response = await this._receiveRepository.updateReceive(input);
        if (response) {
            return ResponseHelper.serverError(ReceiveFailedMessage.UPDATE);
        }
        return ResponseHelper.success(ReceiveSuccessMessage.UPDATE);
    }
}