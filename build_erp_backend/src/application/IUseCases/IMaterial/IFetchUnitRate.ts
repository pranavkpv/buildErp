import { commonOutput } from "../../dto/common";
import { fetchUnitRateInput } from "../../Entities/material.entity";


export interface IFetchUnitRateUseCase{
   execute(input:fetchUnitRateInput):Promise<commonOutput<number> | void>
}