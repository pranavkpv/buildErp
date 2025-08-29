import { categoryListDTO } from '../../dto/category.dto';
import { commonOutput } from '../../dto/common';
import { listingInput } from '../../Entities/common.entity';


export interface IDisplayAllCategoryUseCase {
   execute(input: listingInput):
      Promise<commonOutput<{ data: categoryListDTO[], totalPages: number }> | void>
}