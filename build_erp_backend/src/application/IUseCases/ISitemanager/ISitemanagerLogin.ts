import { ISitemanagerModelEntity } from '../../../domain/Entities/modelEntities/sitemanager.entity';
import { commonOutput } from '../../dto/common';
import { Tokens } from '../../entities/token.entity';


export interface ISitemanagerLoginUseCase {
   execute(email: string, password: string):
      Promise<commonOutput<{ data: ISitemanagerModelEntity, token: Tokens }> | commonOutput>
}