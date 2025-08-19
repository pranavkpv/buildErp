import { commonOutput } from "../../dto/CommonEntities/common";
import { TransferOutput } from "../../dto/PurchaseEntity.ts/Transfer";
import { ITransferRepositoryEntity } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { IGetTransferUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetTransferUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";

export class GetTransferUseCase implements IGetTransferUseCaseEntity {
   private transferRepository: ITransferRepositoryEntity
   constructor(transferRepository: ITransferRepositoryEntity) {
      this.transferRepository = transferRepository
   }
   async execute(search: string, page: number, id: string): Promise<TransferOutput | commonOutput> {
      const { data, totalPage } = await this.transferRepository.fetchTransferList(search, page, id)
      return ResponseHelper.success(TransferSuccessMessage.FETCH,data,totalPage)
   }
}