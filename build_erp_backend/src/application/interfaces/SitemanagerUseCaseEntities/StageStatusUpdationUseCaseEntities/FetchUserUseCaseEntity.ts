import { commonOutput } from "../../../dto/common";
import { chatListDTO } from "../../../dto/user.dto";


export interface IFetchUserUsecaseEntity {
   execute(userId:string): Promise<commonOutput<chatListDTO[]> | commonOutput>
}