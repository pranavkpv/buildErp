import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { Specification } from "../../../Input-OutputEntities/EstimationEntities/specification";


export interface IUpdateSpecUseCase {
   execute(input:Specification):Promise<commonOutput>
}