import { idBrandnameDTO } from "../../../dto/brand.dto";
import { commonOutput } from "../../../dto/common";
import { listingInput } from "../../../entities/common.entity";


export interface IDisplayAllBrandUseCase {
   execute(input : listingInput): Promise<commonOutput<{data:idBrandnameDTO[],totalPage:number}>>
}