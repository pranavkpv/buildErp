import { IPaymentRepostory } from "../../../domain/Entities/IRepository/IPayment";
import { IStageRepository } from "../../../domain/Entities/IRepository/IStage";
import { StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { IVerifyPaymentUseCase } from "../../IUseCases/IStage/IVerifyPayment";

export class VerifyPaymentUseCase implements IVerifyPaymentUseCase {
   constructor(
      private _paymentRepository: IPaymentRepostory,
      private _stageRepository: IStageRepository
   ) { }
   async execute(stageId: string): Promise<commonOutput> {
      await this._paymentRepository.updatePaymentStatus(stageId, "verified")
      await this._stageRepository.updatePaymentStatus(stageId, 'verified')
      return ResponseHelper.success(StageSuccessMessage.VERIFY_PAYMENT)
   }
}