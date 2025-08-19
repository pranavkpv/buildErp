import { IProjectModelEntity } from "../../domain/Entities/modelEntities/project.entity";
import { IProjectmapper } from "../../domain/mappers/IProject.mapper";
import { listAddsiteDTO } from "../dto/addsitemanagerToproject";
import { fetchProjectIdnameDTO, publicProjectDTO, userBasechatListDTO, userBaseProjectDTO } from "../dto/project.dto";
import { listAddSiteToproject } from "../entities/addsitemanagertoproject.entity";
import { userBaseChatoutput } from "../entities/project.entity";

export class projectMapper implements IProjectmapper {
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
         longitude: project.longitude
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
         status: project.status
      }))
   }
   toUserBaseChatDto(projects: userBaseChatoutput[]): userBasechatListDTO[] {
      return projects.map((project) => ({
         _id: project._id,
         project_name: project.project_name,
         sitemanager_id: project.sitemanager_id,
         sitemanager_name: project.sitemanager_name,
         sitemanager_image: project.sitemanager_image
      }))
   }
   toIdandnameDto(projects: IProjectModelEntity[]): fetchProjectIdnameDTO[] {
      return projects.map((project) => ({
         _id: project._id,
         project_name: project.project_name
      }))
   }
   toListAddsiteToprojectDto(datas: listAddSiteToproject[]): listAddsiteDTO[] {
      return datas.map((data) => ({
         _id: data._id,
         project_name: data.project_name,
         sitemanagerDetails: data.sitemanagerDetails.map((item) => ({
            _id: item._id,
            username: item.username,
            email: item.email,
         }))
      }))
   }
}