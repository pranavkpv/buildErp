import { IGetReceiveUseCase } from '../../IUseCases/IReceive/IGetReceive';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ReceiveFailedMessage, ReceiveSuccessMessage } from '../../../Shared/Messages/Receive.Message';
import { IReceiveRepository } from '../../../domain/Entities/IRepository/IReceive';
import { commonOutput } from '../../dto/common';
import { RecieveOutput } from '../../dto/receive.dto';

export class GetReceiveUseCase implements IGetReceiveUseCase {
    constructor(
      private _receiveRepository: IReceiveRepository,
    ) { }
    async execute(search: string, page: number):
      Promise<commonOutput<{ data: RecieveOutput[], totalPage: number }> | commonOutput> {
        const { data, totalPage } = await this._receiveRepository.getReceivesBySearchAndPage(search, page);
        if (!data) {
            return ResponseHelper.badRequest(ReceiveFailedMessage.FETCH);
        }
        return ResponseHelper.success(ReceiveSuccessMessage.FETCH, { data, totalPage });
    }
}