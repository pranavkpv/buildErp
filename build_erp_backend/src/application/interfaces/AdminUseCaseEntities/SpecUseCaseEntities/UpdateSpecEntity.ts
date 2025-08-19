import { commonOutput } from "../../../dto/CommonEntities/common";
import { InputSpecification } from "../../../dto/EstimationEntities/specification";


export interface IUpdateSpecUseCaseEntity {
   execute(input:InputSpecification):Promise<commonOutput>
}