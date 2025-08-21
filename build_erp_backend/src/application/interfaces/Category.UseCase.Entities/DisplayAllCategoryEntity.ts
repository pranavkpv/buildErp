import { categoryListDTO } from "../../dto/category.dto";
import { commonOutput } from "../../dto/common";
import { listingInput } from "../../entities/common.entity";


export interface IDisplayAllCategoryUseCase {
   execute(input:listingInput): Promise<commonOutput<{data:categoryListDTO[],totalPage:number}> | void>
}