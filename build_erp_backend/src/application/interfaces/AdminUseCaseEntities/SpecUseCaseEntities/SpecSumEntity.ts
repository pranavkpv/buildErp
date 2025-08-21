import { commonOutput } from "../../../dto/common";
import { mixMatAndLabour } from "../../../entities/spec.entity";


export interface ISpecSumUseCaseEntity {
   execute(input:mixMatAndLabour):Promise<commonOutput<number> | commonOutput>
}