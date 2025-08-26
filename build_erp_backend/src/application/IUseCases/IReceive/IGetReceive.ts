import { commonOutput } from "../../dto/common";
import { RecieveOutput } from "../../dto/receive.dto";


export interface IGetReceiveUseCase {
   execute(search: string, page: number):
      Promise<commonOutput<{ data: RecieveOutput[], totalPage: number }> | commonOutput>
}