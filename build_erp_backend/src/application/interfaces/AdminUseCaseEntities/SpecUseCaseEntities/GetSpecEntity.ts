import { commonOutput } from "../../../dto/common";
import { specFullDTO } from "../../../dto/specification.dto";



export interface IgetSpecUseCase {
   execute():Promise<commonOutput<specFullDTO[]> | commonOutput>
}