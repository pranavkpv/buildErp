import { IProjectModelEntity } from '../../domain/Entities/modelEntities/project.entity';
import { IProjectStockModelEntity } from '../../domain/Entities/modelEntities/projectStock.entity';
import { IUserModelEntity } from '../../domain/Entities/modelEntities/user.entity';

export interface userBaseChatoutput {
   _id: string;
   project_name: string;
   sitemanager_id: string;
   sitemanager_name: string;
   sitemanager_image?: string;
   user_id: string;
   username: string
}

export interface fetchprojectInput {
   status: string
   search: string
   area: number
   page: number
}

export interface addProjectInput {
   _id:string
   project_name: string,
   type: string
   floor: number
   cost: number
   address: string,
   area: number,
   description: string,
   latitude: number,
   longitude: number
}


export interface projectwithClient extends IProjectModelEntity {
   userDetails: IUserModelEntity
}

export interface statusBaseProjectInput {
   page: number,
   area: number,
   search: string
   status: string
}


export interface ProjectStockOutput extends IProjectStockModelEntity {
   projectDetails: IProjectModelEntity
}

export interface projectStockInput {
   _id: string,
   project_id: string,
   material_id: string,
   stock: number
}

export interface incrementStockInput {
   material_id: string,
   project_id: string,
   quantity: number
}

export interface groupedProjectwithStatus {
   _id: string
   count: number
   createdAt: Date
   updatedAt: Date
}


export interface createProjectInterface {
   user_id: string, project_name: string, type: string, floor: number,
   cost: number, address: string, area: number, description: string, latitude: number,
   longitude: number, email: string, mobile_number: number
}

export interface editProjectInput extends createProjectInterface {
   _id: string
}