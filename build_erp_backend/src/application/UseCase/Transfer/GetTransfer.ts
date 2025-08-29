import { IGetTransferUseCase } from '../../IUseCases/ITransfer/IGetTransfer';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { TransferSuccessMessage } from '../../../Shared/Messages/Transfer.Message';
import { ITransferRepository } from '../../../domain/Entities/IRepository/ITransfer';
import { listTransferDTO } from '../../dto/transfer.dto';
import { commonOutput } from '../../dto/common';

export class GetTransferUseCase implements IGetTransferUseCase {
    constructor(
      private _transferRepository: ITransferRepository,
    ) { }
    async execute(search: string, page: number, id: string):
      Promise<commonOutput<{ data: listTransferDTO[], totalPage: number }> | commonOutput> {
        const { data, totalPage } = await this._transferRepository.fetchTransferList(search, page, id);
        return ResponseHelper.success(TransferSuccessMessage.FETCH, { data, totalPage });
    }
}