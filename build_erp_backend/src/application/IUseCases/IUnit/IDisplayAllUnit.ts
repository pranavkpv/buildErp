import { commonOutput } from '../../dto/common';
import { listUnitDTO } from '../../dto/unit.dto';
import { listingInput } from '../../Entities/common.entity';


export interface IDisplayAllUnitUseCase {
   execute(input: listingInput):
      Promise<commonOutput<{ data: listUnitDTO[], totalPage: number }>>
}