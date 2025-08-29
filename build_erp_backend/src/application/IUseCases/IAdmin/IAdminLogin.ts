import { IAdminModelEntity } from '../../../domain/Entities/modelEntities/admin.entity';
import { commonOutput } from '../../dto/common';
import { inputAdmin } from '../../Entities/admin.entity';
import { Tokens } from '../../Entities/token.entity';


export interface IAdminLoginUseCase {
   execute(input: inputAdmin):
      Promise<commonOutput<{ data: IAdminModelEntity, token: Tokens }> | commonOutput>
}