import { commonOutput } from '../../dto/common';
import { userBaseProjectDTO } from '../../dto/project.dto';
import { saveRequirementInput } from '../../entities/requirement.entity';

export interface ISaveRequirementUseCase {
   execute(input: saveRequirementInput):  Promise<commonOutput | commonOutput<userBaseProjectDTO>>
}