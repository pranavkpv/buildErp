import { commonOutput } from "../../dto/common";
import { listEstimationDTO } from "../../dto/estimation.dto";


export interface IDisplayEstimationUseCase {
   axecute(search: string, page: number):
      Promise<commonOutput<{ data: listEstimationDTO[], totalPage: number }> | commonOutput>
}