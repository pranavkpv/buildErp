import { commonOutput } from "../../dto/common";
import { specListInProjectDTO } from "../../dto/estimation.dto";

export interface IFetchSpecListUsingEstimationUsecase {
   execute(_id: string):
      Promise<commonOutput<specListInProjectDTO[]>>
}