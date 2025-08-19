import { commonOutput } from "../../../dto/common";
import { saveEstimationInput } from "../../../entities/estimation.entity";


export interface IUpdateEstimationUseCase{
   execute(input: { projectId: string, row: saveEstimationInput[] }):Promise<commonOutput>
}