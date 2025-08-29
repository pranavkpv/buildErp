import { commonOutput } from '../../dto/common';
import { editSitemanagerInput } from '../../Entities/sitemanager.entity';


export interface IUpdateSitemanagerUseCase {
   execute(input: editSitemanagerInput): Promise<commonOutput> 
}