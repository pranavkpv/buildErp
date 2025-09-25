import { fetchProjectIdnameDTO } from '../../../application/dto/project.dto';
import { listTransferDTO, TransferOutput } from '../../../application/dto/transfer.dto';
import { transferInput } from '../../../application/entities/transfer.entity';
import { ITransferModelEntity } from '../modelEntities/transfer.entity';

export interface ITransferRepository {

   fetchTransferList(search: string, page: number, id: string):
      Promise<{ data: listTransferDTO[], totalPage: number }>

   fectToproject(projectId: string):
      Promise<fetchProjectIdnameDTO[]>

   saveTransfer(input: transferInput):
      Promise<boolean>

   updateTransfer(input: transferInput):
      Promise<boolean>

   deleteTransfer(id: string):
      Promise<boolean>

   approveTransfer(id: string):
      Promise<void>

   findTransferBytransferId(transferId: string):
      Promise<ITransferModelEntity | null>

   findTransferDataByToProjectAndDate(id: string, date: string):
      Promise<TransferOutput[]>

   UpdateReceiveStatus(transferId: string[]):
      Promise<void>

   updateReceiveStatusToFalse(transferId: string[]):
      Promise<void>

   findAllTransfer():
      Promise<ITransferModelEntity[]>

   getTransferByMaterialId(id: string):
      Promise<ITransferModelEntity | null>

   getTransferByProjectId(id: string):
      Promise<ITransferModelEntity | null>

   getUnApprovedTransferByProjectId(id: string):
      Promise<ITransferModelEntity[]>

   getUserBaseTransfer(userId: string):
      Promise<listTransferDTO[]>

   rejectTransfer(transferId: string):
      Promise<void>

}
