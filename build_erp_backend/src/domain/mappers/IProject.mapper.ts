import { listAddsiteDTO } from "../../application/dto/addsitemanagerToproject";
import { displayProjectDTO, fetchProjectIdnameDTO, publicProjectDTO, userBasechatListDTO, userBaseProjectDTO } from "../../application/dto/project.dto";
import { stageListDTO } from "../../application/dto/stage.dto";
import { listAddSiteToproject } from "../../application/entities/addsitemanagertoproject.entity";
import { projectwithClient, userBaseChatoutput } from "../../application/entities/project.entity";
import { IProjectModelEntity } from "../Entities/modelEntities/project.entity";

export interface IProjectmapper {
   toPublicProjectDto(projects: IProjectModelEntity[]): publicProjectDTO[]
   touserBaseProjectDto(projects: IProjectModelEntity[]): userBaseProjectDTO[]
   toUserBaseChatDto(projects: userBaseChatoutput[]): userBasechatListDTO[]
   toIdandnameDto(projects: IProjectModelEntity[]): fetchProjectIdnameDTO[]
   toListAddsiteToprojectDto(datas: listAddSiteToproject[]): listAddsiteDTO[]
   todisplayProjectDTO(projects: projectwithClient[]): displayProjectDTO[]
   toStageListDto(stage: IProjectModelEntity[]): stageListDTO[]
}