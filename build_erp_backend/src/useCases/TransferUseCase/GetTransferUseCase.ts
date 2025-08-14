import { commonOutput } from "../../DTO/CommonEntities/common";
import { TransferOutput } from "../../DTO/PurchaseEntity.ts/Transfer";
import { ITransferRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IGetTransferUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetTransferUseCaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { TransferSuccessMessage } from "../../Shared/Messages/Transfer.Message";

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