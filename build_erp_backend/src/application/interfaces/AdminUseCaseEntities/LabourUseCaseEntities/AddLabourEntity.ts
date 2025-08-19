import { commonOutput } from "../../../dto/common";
import { labourAddInput } from "../../../entities/labour.entity";


export interface IAddLabourUseCase {
   execute(input: labourAddInput): Promise<commonOutput>
}