import { ISitemanagerRepository } from "../../Entities/repositoryEntities/Site-management/ISitemanagerRepository";
import { Sitemanager } from "../../Entities/Input-OutputEntities/SitemanagerEntities/sitemanager";
import { sitemanagerDB } from "../../Database/Model/SitemanagerModel";
import { ISitemanagerModelEntity } from "../../Entities/ModelEntities/Sitemanager.Entity";



export class SitemanagerRepository implements ISitemanagerRepository {
   async findAllSitemanager(page:number,search:string): Promise<{getSiteData:any[];totalPage:number }> {
       const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const list = await sitemanagerDB.find({username:{$regex:searchRegex}}).skip(skip).limit(5)
      const totalPage = await sitemanagerDB.countDocuments()/5
      return {
         getSiteData: list,
         totalPage
      }
   }
   async findSitemanagerByEmail(email: string): Promise<ISitemanagerModelEntity | null> {
      const ExistSitemanager = await sitemanagerDB.findOne({ email:{$regex:new RegExp(`^${email}$`,"i")} })
      return ExistSitemanager 
   }
   async saveSitemanager(username: string, email: string, password: string): Promise<void> {
      const newSitemanager = new sitemanagerDB({
         username,
         email,
         password
      })
      await newSitemanager.save()
   }
   async findSitemanagerInEdit(_id: string, email: string): Promise<ISitemanagerModelEntity | null> {
      const existData = await sitemanagerDB.findOne({ _id: { $ne: _id }, email: {$regex:new RegExp(`^${email}$`,"i")} })
      return existData 
   }
   async updateSitemanager(_id: string, username: string, email: string): Promise<void> {
      await sitemanagerDB.findByIdAndUpdate(_id, {
         username,
         email
      })
   }
   async deleteSitemanager(_id: string): Promise<void> {
      await sitemanagerDB.findByIdAndDelete(_id)
   }
   async generatePassword(): Promise<string> {
      let result = ""
      let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()><?"
      for(let i=0;i<10;i++){
         result+=char[Math.floor(Math.random() * char.length)]
      }
      return result
   }
   async findSitemanagerById(_id:string):Promise<ISitemanagerModelEntity | null>{
      const data = await sitemanagerDB.findById(_id)
      return data 
   }
   async updatePassword(_id: string, password: string): Promise<void> {
      await sitemanagerDB.findByIdAndUpdate(_id,{password})
   }
  
}