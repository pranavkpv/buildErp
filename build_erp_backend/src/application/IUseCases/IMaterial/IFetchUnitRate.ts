import { commonOutput } from "../../dto/common";
import { unitRateDTO } from "../../dto/material.dto";
import { fetchUnitRateInput } from "../../Entities/material.entity";


export interface IFetchUnitRateUseCase{
   execute(input:fetchUnitRateInput):Promise<commonOutput<unitRateDTO> | void>
}