import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { InputSpecification } from "../../../../DTO/EstimationEntities/specification";


export interface ISaveSpecUseCaseEntity {
   execute(input:InputSpecification): Promise<commonOutput>
}