import { ITransferRepository } from '../../../domain/Entities/IRepository/ITransfer';
import { TransferSuccessMessage } from '../../../Shared/Messages/Transfer.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { listTransferDTO } from '../../dto/transfer.dto';
import { IGetUserBaseTransferUseCase } from '../../IUseCases/ITransfer/IGetUserBaseTransfer';

export class GetUserBaseTransferUseCase implements IGetUserBaseTransferUseCase {
    constructor(
      private _transferRepository: ITransferRepository,
    ) { }
    async execute(userId: string): Promise<commonOutput<listTransferDTO[]>> {
        const data = await this._transferRepository.getUserBaseTransfer(userId);
        return ResponseHelper.success(TransferSuccessMessage.FETCH, data);
    }
}