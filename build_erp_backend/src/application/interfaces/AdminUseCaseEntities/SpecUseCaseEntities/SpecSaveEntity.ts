import { commonOutput } from "../../../dto/CommonEntities/common";
import { InputSpecification } from "../../../dto/EstimationEntities/specification";


export interface ISaveSpecUseCaseEntity {
   execute(input:InputSpecification): Promise<commonOutput>
}