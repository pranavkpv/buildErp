import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { InputSpecification } from "../../../../DTO/EstimationEntities/specification";


export interface IUpdateSpecUseCaseEntity {
   execute(input:InputSpecification):Promise<commonOutput>
}