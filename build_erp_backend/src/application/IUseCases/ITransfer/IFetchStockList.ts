import { commonOutput } from "../../dto/common";
import { projectStockListDTO } from "../../dto/transfer.dto";

export interface IFetchStockListUseCase {
   execute(projectId: string): Promise<commonOutput<projectStockListDTO[]>>
}