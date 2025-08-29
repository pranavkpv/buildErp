import { commonOutput } from '../../dto/common';
import { labourDataDisplayDTO } from '../../dto/labour.dto';



export interface IFetchLabourByIdUsecase {
   execute(id: string):
      Promise<commonOutput<labourDataDisplayDTO> | commonOutput>
}