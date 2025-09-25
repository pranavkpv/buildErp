import { commonOutput } from '../../dto/common';
import { editSitemanagerInput } from '../../entities/sitemanager.entity';


export interface IUpdateSitemanagerUseCase {
   execute(input: editSitemanagerInput): Promise<commonOutput> 
}