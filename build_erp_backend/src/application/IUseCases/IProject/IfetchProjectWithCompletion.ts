import { commonOutput } from '../../dto/common';
import { displayProjectWithCompletionDTO } from '../../dto/project.dto';

export interface IfetchProjectWithCompletionUseCase {
   execute(sitemanagerId: string, page: number, search: string):
      Promise<commonOutput<{ data: displayProjectWithCompletionDTO[], totalPages: number }>>;
}