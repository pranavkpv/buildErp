import { ISitemanagerRepositoryEntity } from "../../Entities/repositoryEntities/Site-management/ISitemanagerRepository";
import { sitemanagerDB } from "../../Database/Model/SitemanagerModel";
import { ISitemanagerModelEntity } from "../../Entities/ModelEntities/Sitemanager.Entity";
import { listingInput } from "../../DTO/CommonEntities/common";
import {
   editSitemanagerInput,
   saveSitemanagerInput,
   updatePasswordInput
} from "../../DTO/SitemanagerEntities/sitemanager";

export class SitemanagerRepository implements ISitemanagerRepositoryEntity {

   /** 📄 Fetch paginated list of site managers with search */
   async findAllSitemanager(input: listingInput): Promise<{ getSiteData: any[]; totalPage: number }> {
      const { page, search } = input;
      const skip = page * 5;
      const searchRegex = new RegExp(search, "i");
      const list = await sitemanagerDB
         .find({ username: { $regex: searchRegex } })
         .skip(skip)
         .limit(5);
      const totalPage = (await sitemanagerDB.countDocuments({ username: { $regex: searchRegex } })) / 5;
      return {
         getSiteData: list,
         totalPage
      };
   }

   /** 📄 Find site manager by email (case-insensitive) */
   async findSitemanagerByEmail(email: string): Promise<ISitemanagerModelEntity | null> {
      return await sitemanagerDB.findOne({ email: { $regex: new RegExp(`^${ email }$`, "i") } });
   }

   /** 📄 Save a new site manager to DB */
   async saveSitemanager(input: saveSitemanagerInput): Promise<void> {
      const { username, email, password } = input;
      const newSitemanager = new sitemanagerDB({
         username,
         email,
         password
      });
      await newSitemanager.save();
   }

   /** 📄 Check if email exists in edit (excluding current ID) */
   async findSitemanagerInEdit(_id: string, email: string): Promise<ISitemanagerModelEntity | null> {
      return await sitemanagerDB.findOne({
         _id: { $ne: _id },
         email: { $regex: new RegExp(`^${ email }$`, "i") }
      });
   }

   /** 📄 Update site manager's username and email */
   async updateSitemanager(input: editSitemanagerInput): Promise<void> {
      const { _id, username, email } = input;
      await sitemanagerDB.findByIdAndUpdate(_id, {
         username,
         email
      });
   }

   /** 📄 Delete a site manager by ID */
   async deleteSitemanager(_id: string): Promise<void> {
      await sitemanagerDB.findByIdAndDelete(_id);
   }

   /** 🔑 Generate a random password (10 chars, letters/numbers/symbols) */
   async generatePassword(): Promise<string> {
      let result = "";
      let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()><?";
      for (let i = 0; i < 10; i++) {
         result += char[Math.floor(Math.random() * char.length)];
      }
      return result;
   }

   /** 📄 Find site manager by ID */
   async findSitemanagerById(_id: string): Promise<ISitemanagerModelEntity | null> {
      return await sitemanagerDB.findById(_id);
   }

   /** 📄 Update password for a site manager */
   async updatePassword(input: updatePasswordInput): Promise<void> {
      const { _id, password } = input;
      await sitemanagerDB.findByIdAndUpdate(_id, { password });
   }
}
