import { IPaymentRepostory } from '../../../domain/Entities/IRepository/IPayment';
import { IStagemapper } from '../../../domain/IMappers/IStage.mapper';
import { StageSuccessMessage } from '../../../Shared/Messages/Stage.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { verifyStageDTO } from '../../dto/stage.dto';
import { listingInput } from '../../Entities/common.entity';
import { IFetchStageForVerifyUseCase } from '../../IUseCases/IStage/IFetchStageForVerify';

export class FetchStageForVerifyUseCase implements IFetchStageForVerifyUseCase {
    constructor(
      private _paymentRepository: IPaymentRepostory,
      private _stageMapper: IStagemapper,
    ) { }
    async execute(input: listingInput): Promise<commonOutput<{data:verifyStageDTO[],totalPage:number}> | commonOutput> {
        const { data,totalPage } = await this._paymentRepository.getAggregatePaymentbyStage(input);
        const mappeddata = this._stageMapper.toVerifypaymentDTO(data);
        return ResponseHelper.success(StageSuccessMessage.FETCH,{ data:mappeddata,totalPage } );
    }
}