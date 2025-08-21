import { fetchProjectIdnameDTO } from "../../../application/dto/project.dto";
import { listTransferDTO, TransferOutput } from "../../../application/dto/transfer.dto";
import { transferInput } from "../../../application/entities/transfer.entity";
import { ITransferModelEntity } from "../../Entities/modelEntities/transfer.entity";

export interface ITransferRepository {
   fetchTransferList(search: string, page: number, id: string): Promise<{data:listTransferDTO[],totalPage:number}>
   fectToproject(projectId: string): Promise<fetchProjectIdnameDTO[]>
   saveTransfer(input: transferInput): Promise<boolean>
   updateTransfer(input: transferInput): Promise<boolean>
   deleteTransfer(_id: string): Promise<boolean>
   approveTransfer(_id: string): Promise<void>
   findTransferBytransferId(transfer_id: string): Promise<ITransferModelEntity | null>
   findTransferDataByToProjectAndDate(_id: string, date: string): Promise<TransferOutput[]>
   UpdateReceiveStatus(transferId:string[]):Promise<void>
   updateReceiveStatusToFalse(transfer_id:string[]):Promise<void>
   findAllTransfer():Promise<ITransferModelEntity[]>
}
