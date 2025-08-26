import { commonOutput } from "../../dto/common";
import { specFullDTO } from "../../dto/specification.dto";



export interface IGetSpecUseCase {
   execute():Promise<commonOutput<specFullDTO[]> | commonOutput>
}