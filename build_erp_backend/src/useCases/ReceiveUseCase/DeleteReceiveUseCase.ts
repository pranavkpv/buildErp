import { commonOutput } from "../../DTO/CommonEntities/common";
import { IReceiveRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { ITransferRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IDeleteReceiveUsecaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/ReceiveUseCaseEntities/DeleteReceiveUseCaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ReceiveFailedMessage, ReceiveSuccessMessage } from "../../Shared/Messages/Receive.Message";

export class DeleteReceiveUsecase implements IDeleteReceiveUsecaseEntity {
   private receiveRepository: IReceiveRepositoryEntity
   private transferRepository: ITransferRepositoryEntity
   constructor(receiveRepository: IReceiveRepositoryEntity, transferRepository: ITransferRepositoryEntity) {
      this.receiveRepository = receiveRepository
      this.transferRepository = transferRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      const deleteData = await this.receiveRepository.getReceiveById(_id)
      if (!deleteData) {
         return ResponseHelper.serverError(ReceiveFailedMessage.DELETE)
      }
      const response = await this.receiveRepository.deleteReceiveById(_id)
      if (!response) {
         return ResponseHelper.serverError(ReceiveFailedMessage.DELETE)
      }
      await this.transferRepository.updateReceiveStatusToFalse(deleteData.transfer_id)
      return ResponseHelper.success(ReceiveSuccessMessage.DELETE)
   }
}