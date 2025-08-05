import { projectData, transferInput, TransferOutput } from "../../Input-OutputEntities/PurchaseEntity.ts/Transfer";
import { ITransferModelEntity } from "../../ModelEntities/Transfer.Entity";

export interface ITransferRepository {
   fetchTransferList(search: string, page: number, id: string): Promise<TransferOutput>
   fectToproject(projectId: string): Promise<projectData[]>
   saveTransfer(input: transferInput): Promise<boolean>
   updateTransfer(input: transferInput): Promise<boolean>
   deleteTransfer(_id: string): Promise<boolean>
   approveTransfer(_id: string): Promise<void>
   findTransferBytransferId(transfer_id: string): Promise<ITransferModelEntity | null>
   findTransferDataByToProjectAndDate(_id: string, date: string): Promise<TransferOutput>
   UpdateReceiveStatus(transferId:string[]):Promise<void>
   updateReceiveStatusToFalse(transfer_id:string[]):Promise<void>
}
