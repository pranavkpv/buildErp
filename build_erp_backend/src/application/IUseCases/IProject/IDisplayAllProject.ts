import { commonOutput } from '../../dto/common';
import { displayProjectDTO } from '../../dto/project.dto';
import { listingInput } from '../../entities/common.entity';

export interface IDisplayAllProjectUseCase {
   execute(input: listingInput):
      Promise<commonOutput<{ data: displayProjectDTO[], totalPage: number }> | commonOutput>
}