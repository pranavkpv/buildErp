import { commonOutput } from "../../dto/common";
import { labourDataDisplayDTO } from "../../dto/labour.dto";


export interface IFetchAllLabourUseCase{
   execute():Promise<commonOutput<labourDataDisplayDTO[]> | commonOutput>
}