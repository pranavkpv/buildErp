import { commonOutput } from '../../dto/common';
import { saveCategoryInput } from '../../entities/category.entity';

export interface ISaveCategoryUseCase {
   execute(input: saveCategoryInput):
      Promise<commonOutput>
}