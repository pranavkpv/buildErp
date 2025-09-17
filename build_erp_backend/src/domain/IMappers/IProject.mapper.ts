import { listAddsiteDTO } from '../../application/dto/addsitemanagerToproject';
import { displayProjectDTO, displayStatusCountDTO, expectedImageDTO, fetchProjectIdnameDTO, OnlyIdDTO, publicProjectDTO, userBasechatListDTO, userBaseProjectDTO } from '../../application/dto/project.dto';
import { stageListDTO } from '../../application/dto/stage.dto';
import { listAddSiteToproject } from '../../application/Entities/addsitemanagertoproject.entity';
import { groupedProjectwithStatus, projectwithClient, userBaseChatoutput } from '../../application/Entities/project.entity';
import { IProjectModelEntity } from '../Entities/modelEntities/project.entity';

export interface IProjectmapper {
   toPublicProjectDto(projects: IProjectModelEntity[]): publicProjectDTO[]
   touserBaseProjectDto(projects: IProjectModelEntity[]): userBaseProjectDTO[]
   toUserBaseChatDto(projects: userBaseChatoutput[]): userBasechatListDTO[]
   toIdandnameDto(projects: IProjectModelEntity[]): fetchProjectIdnameDTO[]
   toListAddsiteToprojectDto(datas: listAddSiteToproject[]): listAddsiteDTO[]
   todisplayProjectDTO(projects: projectwithClient[]): displayProjectDTO[]
   toStageListDto(stage: IProjectModelEntity[]): stageListDTO[]
   toStatusCountDto(project:groupedProjectwithStatus[]):displayStatusCountDTO[]
   toUserBaseOneProjectDto(project:IProjectModelEntity):userBaseProjectDTO
   toOnlyId(project:IProjectModelEntity[]):OnlyIdDTO[]
   toExpectedImageDto(project:IProjectModelEntity):expectedImageDTO[]
}