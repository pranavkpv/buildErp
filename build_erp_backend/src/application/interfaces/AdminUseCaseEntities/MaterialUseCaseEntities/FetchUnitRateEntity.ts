import { commonOutput } from "../../../dto/common";
import { fetchUnitRateInput } from "../../../entities/material.entity";


export interface IFetchUnitRateUseCase{
   execute(input:fetchUnitRateInput):Promise<commonOutput<number> | void>
}