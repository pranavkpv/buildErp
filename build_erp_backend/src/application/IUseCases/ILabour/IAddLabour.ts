import { commonOutput } from "../../dto/common";
import { labourAddInput } from "../../Entities/labour.entity";


export interface IAddLabourUseCase {
   execute(input: labourAddInput): Promise<commonOutput>
}