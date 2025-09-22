import { IPaymentRepostory } from '../../../domain/Entities/IRepository/IPayment';
import { IStagemapper } from '../../../domain/IMappers/IStage.mapper';
import { StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { walletDTO } from '../../dto/payment.dto';
import { IGetWalletHistoryUseCase } from '../../IUseCases/IUserProfile/IGetWalletHistory';

export class GetWalletHistoryUseCase implements IGetWalletHistoryUseCase {
    constructor(
      private _paymentRepository: IPaymentRepostory,
      private _stagemapper: IStagemapper,
    ) { }
    async execute(page: number, search: string, userId: string): Promise<commonOutput<{ data: walletDTO[], totalPage: number }> | commonOutput> {
        const { data, totalPage } = await this._paymentRepository.getWalletHistoryRepo(page,search,userId);
        const mappedData = this._stagemapper.toWalletDTO(data);
        return ResponseHelper.success(StageSuccessMessage.SUCCESS_PAY, { data: mappedData, totalPage });
    }
}