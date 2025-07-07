import { ISitemanagerRepository } from "../../domain/repositories/ISitemanagerRepository";
import { Sitemanager } from "../../domain/types/sitemanager";
import SitemanagerModel from "../../models/SitemanagerModel";


export class SitemanagetmongooseRepository implements ISitemanagerRepository {
   async findAllSitemanager(page:number,search:string): Promise<{getSiteData:any[];totalPage:number }> {
       const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const list = await SitemanagerModel.find({username:{$regex:searchRegex}}).skip(skip).limit(5)
      const totalPage = await SitemanagerModel.countDocuments()/5
      return {
         getSiteData: list,
         totalPage
      }
   }
   async findSitemanagerByEmail(email: string): Promise<Sitemanager | null> {
      const ExistSitemanager = await SitemanagerModel.findOne({ email:{$regex:new RegExp(`^${email}$`,"i")} })
      return ExistSitemanager ? ExistSitemanager : null
   }
   async saveSitemanager(username: string, email: string, password: string): Promise<void> {
      const newSitemanager = new SitemanagerModel({
         username,
         email,
         password
      })
      await newSitemanager.save()
   }
   async findSitemanagerInEdit(_id: string, email: string): Promise<Sitemanager | null> {
      const existData = await SitemanagerModel.findOne({ _id: { $ne: _id }, email: {$regex:new RegExp(`^${email}$`,"i")} })
      return existData ? existData : null
   }
   async updateSitemanager(_id: string, username: string, email: string): Promise<void> {
      await SitemanagerModel.findByIdAndUpdate(_id, {
         username,
         email
      })
   }
   async deleteSitemanager(_id: string): Promise<void> {
      await SitemanagerModel.findByIdAndDelete(_id)
   }
   async generatePassword(): Promise<string> {
      let result = ""
      let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()><?"
      for(let i=0;i<10;i++){
         result+=char[Math.floor(Math.random() * char.length)]
      }
      return result
   }
   async findSitemanagerById(_id:string):Promise<Sitemanager | null>{
      const data = await SitemanagerModel.findById(_id)
      return data ? data :null
   }
   async updatePassword(_id: string, password: string): Promise<void> {
      await SitemanagerModel.findByIdAndUpdate(_id,{password})
   }
  
}