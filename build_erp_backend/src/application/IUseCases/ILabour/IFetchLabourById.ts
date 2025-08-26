import { commonOutput } from "../../dto/common";
import { labourDataDisplayDTO } from "../../dto/labour.dto";



export interface IFetchLabourByIdUsecase {
   execute(_id: string):
      Promise<commonOutput<labourDataDisplayDTO> | commonOutput>
}