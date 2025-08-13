import { ISitemanagerModelEntity } from "../../Entities/ModelEntities/Sitemanager.Entity"

export interface Sitemanager {
  _id: string,
  username: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}






export interface editSitemanagerInput {
  _id: string
  username: string,
  email: string,

}

export interface changePasswordInput {
  _id: string,
  password: string,
  changedpassword: string
}

export interface sitemanagerOutput {
  success?: boolean,
  message?: string,
  status_code?: number,
  data: ISitemanagerModelEntity[] | ISitemanagerModelEntity | any[],
  totalPage?: number
}

export interface saveSitemanagerInput {
  username: string,
  email: string,
  password: string
}

export interface updatePasswordInput {
  _id:string,
  password:string
}
