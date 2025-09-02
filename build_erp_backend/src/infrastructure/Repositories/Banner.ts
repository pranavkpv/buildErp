import { bannerDB } from "../../api/models/BannerModel";
import { addBannerInput, editBannerInput } from "../../application/Entities/banner.entity";
import { listingInput } from "../../application/Entities/common.entity";
import { IBannerRepository } from "../../domain/Entities/IRepository/IBanner";
import { IBannerModelEntity } from "../../domain/Entities/modelEntities/banner.entity";


export class BannerRepository implements IBannerRepository {
   async saveBanner(input: addBannerInput): Promise<IBannerModelEntity> {
      const { image, title, subtitle } = input
      const newBanner = new bannerDB({
         image,
         title,
         subtitle
      })
      return await newBanner.save()
   }
   async listBannerBysearchandPage(input: listingInput):
      Promise<{ data: IBannerModelEntity[]; totalPage: number; }> {
      const { page, search } = input
      const skip = page * 5
      const listBanner = await bannerDB.find({ title: { $regex: search, $options: "i" } }).skip(skip).limit(5)
      const totalDoc = await bannerDB.find({ title: { $regex: search, $options: "i" } })
      const totalPage = Math.ceil(totalDoc.length / 5)
      return {
         data: listBanner,
         totalPage
      }
   }
   async updateBanner(input: editBannerInput): Promise<IBannerModelEntity | null> {
      const { _id, image, title, subtitle } = input
      if (image === "") {
         return await bannerDB.findByIdAndUpdate(_id, { title, subtitle })
      }
      return await bannerDB.findByIdAndUpdate(_id, { image, title, subtitle })
   }
   async deleteBanner(_id: string): Promise<void> {
      console.log(_id)
      await bannerDB.findByIdAndDelete(_id)
   }
}