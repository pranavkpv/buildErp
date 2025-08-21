import { commonOutput } from "../../../dto/common";
import { InputSpecification } from "../../../entities/spec.entity";


export interface IUpdateSpecUseCase {
   execute(input:InputSpecification):Promise<commonOutput>
}