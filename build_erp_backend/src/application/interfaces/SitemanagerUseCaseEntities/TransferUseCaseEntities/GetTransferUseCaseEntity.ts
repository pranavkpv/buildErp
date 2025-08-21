import { commonOutput } from "../../../dto/common";
import { listTransferDTO } from "../../../dto/transfer.dto";


export interface IGetTransferUseCaseEntity {
   execute(search: string, page: number, id: string): Promise<commonOutput<{data:listTransferDTO[],totalPage:number}> | commonOutput>
}