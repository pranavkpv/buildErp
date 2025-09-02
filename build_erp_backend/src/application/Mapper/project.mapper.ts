import { IProjectModelEntity } from '../../domain/Entities/modelEntities/project.entity';
import { IProjectmapper } from '../../domain/IMappers/IProject.mapper';
import { listAddsiteDTO } from '../dto/addsitemanagerToproject';
import { displayProjectDTO, fetchProjectIdnameDTO, publicProjectDTO, userBasechatListDTO, userBaseProjectDTO } from '../dto/project.dto';
import { stageListDTO } from '../dto/stage.dto';
import { listAddSiteToproject } from '../Entities/addsitemanagertoproject.entity';
import { projectwithClient, userBaseChatoutput } from '../Entities/project.entity';

export class ProjectMapper implements IProjectmapper {
    toPublicProjectDto(projects: IProjectModelEntity[]): publicProjectDTO[] {
        return projects.map((project) => ({
            _id: project._id,
            project_name: project.project_name,
            expected_image: project.expected_image,
            finalImage: project.finalImage,
            area: project.area,
            address: project.address,
            status: project.status,
            description: project.description,
            latitude: project.latitude,
            longitude: project.longitude,
        }));
    }
    touserBaseProjectDto(projects: IProjectModelEntity[]): userBaseProjectDTO[] {
        return projects.map((project) => ({
            _id: project._id,
            address: project.address,
            area: project.area,
            budgeted_cost: project.budgeted_cost,
            description: project.description,
            end_date: project.end_date,
            expected_image: project.expected_image,
            project_name: project.project_name,
            start_date: project.start_date,
            status: project.status,
        }));
    }
    toUserBaseChatDto(projects: userBaseChatoutput[]): userBasechatListDTO[] {
        return projects.map((project) => ({
            _id: project._id,
            project_name: project.project_name,
            sitemanager_id: project.sitemanager_id,
            sitemanager_name: project.sitemanager_name,
            sitemanager_image: project.sitemanager_image,
        }));
    }
    toIdandnameDto(projects: IProjectModelEntity[]): fetchProjectIdnameDTO[] {
        return projects.map((project) => ({
            _id: project._id,
            project_name: project.project_name,
        }));
    }
    toListAddsiteToprojectDto(datas: listAddSiteToproject[]): listAddsiteDTO[] {
        return datas.map((data) => ({
            _id: data._id,
            project_name: data.project_name,
            sitemanagerDetails: data.sitemanagerDetails.map((item) => ({
                _id: item._id,
                username: item.username,
                email: item.email,
            })),
        }));
    }
    todisplayProjectDTO(projects: projectwithClient[]): displayProjectDTO[] {
        return projects.map((element)=>({
            _id:element._id,
            address:element.address,
            area:element.area,
            description:element.description,
            email:element.email,
            mobile_number:element.mobile_number,
            project_name:element.project_name,
            status:element.status,
            lat:element.latitude,
            long:element.longitude,
            userDetails:{
                _id:element.userDetails._id,
                username:element.userDetails.username,
                email:element.userDetails.email,
                phone:element.userDetails.phone,
            },
        }));
    }
    toStageListDto(stage: IProjectModelEntity[]): stageListDTO[] {
        return stage.map((element)=>({
            _id:element._id,
            end_date:element.end_date,
            project_name:element.project_name,
            start_date:element.start_date,
        }));
    }
}