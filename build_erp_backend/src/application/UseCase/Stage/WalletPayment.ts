import { INotificationRepository } from "../../../domain/Entities/IRepository/INotification";
import { IPaymentRepostory } from "../../../domain/Entities/IRepository/IPayment";
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { IStageRepository } from "../../../domain/Entities/IRepository/IStage";
import { ProjectFailedMessage } from "../../../Shared/Messages/Project.Message";
import { StageFailedMessage, StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { IWalletPaymentUseCase } from "../../IUseCases/IStage/IWalletPayment";

export class WalletPaymentUsecase implements IWalletPaymentUseCase {
   constructor(
      private _paymentRepository: IPaymentRepostory,
      private _stageRepository: IStageRepository,
      private _projectRepository: IprojectRepository,
      private _notificationRepository: INotificationRepository
   ) { }
   async execute(stageId: string, stageAmount: number): Promise<commonOutput> {
      const stageData = await this._stageRepository.getStageById(stageId)
      if (!stageData) {
         return ResponseHelper.conflictData(StageFailedMessage.FETCH)
      }
      const projectId = stageData.project_id
      const projectData = await this._projectRepository.getProjectById(projectId)
      if (!projectData) {
         return ResponseHelper.conflictData(ProjectFailedMessage.FETCH)
      }
      const data = await this._paymentRepository.getWalletDataBasedMethodAndUser("wallet", projectData.user_id)
      let DebitByTransfer = data.filter((element) => element.purpose == "Transfer Payment")
      let creditByPayment = data.filter((element) => element.purpose == "stage payment")
      let totalWalletBalance = DebitByTransfer.reduce((sum, item) => sum += item.amount, 0) - creditByPayment.reduce((sum, item) => sum += item.amount, 0)
      if (totalWalletBalance < stageAmount) {
         return ResponseHelper.conflictData(StageFailedMessage.INVALID_BALANCE + " as " + totalWalletBalance)
      }
      await this._paymentRepository.createCheckoutSession({
         date: new Date(), amount: stageAmount, paymentMethod: 'wallet',
         purpose: 'stage payment', paymentStatus: 'success', stage_id: stageData._id, stripeSessionId: ""
      })
       await this._stageRepository.updatePaymentStatus(stageData._id, 'completed');
      await this._notificationRepository.saveNotication(new Date(), `the user of the project ${ projectData.project_name } is paid ${ stageData.stage_amount }`, 'admin');
      return ResponseHelper.success(StageSuccessMessage.SUCCESS_PAY)
   }
}