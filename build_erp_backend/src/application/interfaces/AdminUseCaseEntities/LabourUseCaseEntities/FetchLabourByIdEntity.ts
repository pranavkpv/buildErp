import { commonOutput } from "../../../dto/common";
import { labourDataDisplayDTO } from "../../../dto/labour.dto";



export interface IFetchLabourByIdUsecaseEntity{
   execute(_id:string):Promise<commonOutput<labourDataDisplayDTO> | commonOutput>
}