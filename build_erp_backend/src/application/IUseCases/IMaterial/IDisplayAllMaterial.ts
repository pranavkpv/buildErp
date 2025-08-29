import { commonOutput } from '../../dto/common';
import { listingMaterialDTO } from '../../dto/material.dto';
import { listingInput } from '../../Entities/common.entity';

export interface IDisplayAllMaterialUsecase{
   execute(input:listingInput):Promise<commonOutput<{data:listingMaterialDTO[],totalPage:number}> | commonOutput>
}