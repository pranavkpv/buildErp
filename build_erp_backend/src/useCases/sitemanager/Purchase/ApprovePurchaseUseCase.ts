import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { purchaseInput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Purchase";
import { IPurchaseRepository } from "../../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository";
import { IProjectStockRepository } from "../../../Entities/repositoryEntities/Stock-management/IProjectStockRepository";
import { IApprovePurchaseUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/ApprovePurchaseUseCaseEntitty";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class ApprovePurchaseUseCase implements IApprovePurchaseUseCase {
  private purchaseRepository: IPurchaseRepository
  private projectStockRepository: IProjectStockRepository
  constructor(purchaseRepository: IPurchaseRepository, projectStockRepository: IProjectStockRepository) {
    this.purchaseRepository = purchaseRepository
    this.projectStockRepository = projectStockRepository
  }
  async execute(input: purchaseInput): Promise<commonOutput> {
    try {
      if (!input._id) return ResponseHelper.failure(ERROR_MESSAGE.PURCHASE.ERROR, HTTP_STATUS.BAD_REQUEST)
      await this.purchaseRepository.approvePurchase(input?._id)
      for (let char of input.materialDetails) {
        await this.projectStockRepository.IncrementStockById(char.material_id, input.project_id, char.quantity)
      }
      return ResponseHelper.success(SUCCESS_MESSAGE.PURCHASE.APPROVE, HTTP_STATUS.OK)
    } catch (error: any) {
      return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  }
}