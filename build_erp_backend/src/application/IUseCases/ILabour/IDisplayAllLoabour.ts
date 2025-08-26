import { commonOutput } from "../../dto/common";
import { labourDataDisplayDTO } from "../../dto/labour.dto";


export interface IDisplayAllLabourUsecase {
   execute(page: number, search: string):
      Promise<commonOutput<{ data: labourDataDisplayDTO[], totalPage: number }> | commonOutput>
}