import { commonOutput } from '../../dto/common';
import { addsitemanagerInput } from '../../entities/sitemanager.entity';



export interface ISaveSitemanagerUseCase {
   execute(input:addsitemanagerInput): Promise<commonOutput>
}