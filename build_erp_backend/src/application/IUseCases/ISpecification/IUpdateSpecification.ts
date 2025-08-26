import { commonOutput } from "../../dto/common";
import { InputSpecification } from "../../Entities/spec.entity";


export interface IUpdateSpecUseCase {
   execute(input:InputSpecification):Promise<commonOutput>
}