import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { Specification } from "../../../Input-OutputEntities/EstimationEntities/specification";

export interface ISaveSpecUseCase {
   execute(input:Specification): Promise<commonOutput>
}