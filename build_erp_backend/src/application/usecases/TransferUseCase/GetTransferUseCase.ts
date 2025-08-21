import { IGetTransferUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/TransferUseCaseEntities/GetTransferUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { TransferSuccessMessage } from "../../../Shared/Messages/Transfer.Message";
import { ITransferRepository } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { listTransferDTO } from "../../dto/transfer.dto";
import { commonOutput } from "../../dto/common";

export class GetTransferUseCase implements IGetTransferUseCaseEntity {
   constructor(
      private transferRepository: ITransferRepository
   ) { }
   async execute(search: string, page: number, id: string): Promise<commonOutput<{data:listTransferDTO[],totalPage:number}> | commonOutput> {
      const { data, totalPage } = await this.transferRepository.fetchTransferList(search, page, id)
      return ResponseHelper.success(TransferSuccessMessage.FETCH,{data,totalPage})
   }
}