import { IProjectModelEntity } from '../../domain/Entities/modelEntities/project.entity';
import { IProjectmapper } from '../../domain/IMappers/IProject.mapper';
import { listAddsiteDTO } from '../dto/addsitemanagerToproject';
import { displayProjectDTO, displayStatusCountDTO, expectedImageDTO, fetchProjectIdnameDTO, OnlyIdDTO, publicProjectDTO, userBasechatListDTO, userBaseProjectDTO } from '../dto/project.dto';
import { stageListDTO } from '../dto/stage.dto';
import { listAddSiteToproject } from '../entities/addsitemanagertoproject.entity';
import { groupedProjectwithStatus, projectwithClient, userBaseChatoutput } from '../entities/project.entity';

export class ProjectMapper implements IProjectmapper {
    toPublicProjectDto(projects: IProjectModelEntity[]): publicProjectDTO[] {
        return projects.map((project) => ({
            _id: project._id,
            project_name: project.project_name,
            expected_image: project.expected_image[0]?.image || "",
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
            expected_image: project.expected_image[0]?.image || "",
            project_name: project.project_name,
            start_date: project.start_date,
            status: project.status,
            estimateBy: project.estimateBy,
            estimateStatus: project.estimateStatus,
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
        return projects.map((element) => ({
            _id: element._id,
            address: element.address,
            area: element.area,
            description: element.description,
            email: element.email,
            mobile_number: element.mobile_number,
            project_name: element.project_name,
            status: element.status,
            lat: element.latitude,
            long: element.longitude,
            cost: element.budgeted_cost,
            floor: element.floor,
            project_type: element.project_type,
            userDetails: {
                _id: element.userDetails._id,
                username: element.userDetails.username,
                email: element.userDetails.email,
                phone: element.userDetails.phone,
            },
        }));
    }
    toStageListDto(stage: IProjectModelEntity[]): stageListDTO[] {
        return stage.map((element) => ({
            _id: element._id,
            end_date: element.end_date,
            project_name: element.project_name,
            start_date: element.start_date,
            budgeted_cost: element.budgeted_cost,
        }));
    }
    toStatusCountDto(project: groupedProjectwithStatus[]): displayStatusCountDTO[] {
        return project.map((element) => ({
            label: element._id,
            number: element.count,
        }));
    }
    toUserBaseOneProjectDto(project: IProjectModelEntity): userBaseProjectDTO {
        return ({
            _id: project._id,
            address: project.address,
            area: project.area,
            budgeted_cost: project.budgeted_cost,
            description: project.description,
            end_date: project.end_date,
            estimateBy: project.estimateBy,
            expected_image: project.expected_image[0]?.image || "",
            project_name: project.project_name,
            start_date: project.start_date,
            status: project.status,
            estimateStatus: project.estimateStatus,
        });
    }
    toOnlyId(project: IProjectModelEntity[]): OnlyIdDTO[] {
        return project.map((element) => ({
            _id: element._id,
        }));
    }
    toExpectedImageDto(project: IProjectModelEntity): expectedImageDTO[] {
        return project.expected_image.map((element)=>({
            title:element.title,
            image:element.image,
        }));
    }
}