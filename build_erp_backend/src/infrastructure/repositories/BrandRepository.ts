import { brandDB } from "../../api/models/BrandModel";
import { IBrandModelEntity } from "../../domain/Entities/modelEntities/brand.entity";
import { inputBrand, listBrandOutput } from "../../application/dto/BrandEntities/Brand.Entity";
import { listingInput } from "../../application/dto/CommonEntities/common";
import { IBrandRepositoryEntity } from "../../domain/interfaces/Material-management/IBrandRepository";

/**
 * Repository class for Brand-related database operations.
 */
export class BrandRepository implements IBrandRepositoryEntity {

  /**
   * Retrieves all brands from the database.
   */
  async findAllBrand(): Promise<IBrandModelEntity[] | []> {
    return await brandDB.find();
  }

  /**
   * Finds a brand by its name (case-insensitive).
   */
  async findBrandByName(input: inputBrand): Promise<IBrandModelEntity | null> {
    return await brandDB.findOne({
      brand_name: { $regex: new RegExp(`^${input.brand_name}$`, "i") }
    });
  }

  /**
   * Saves a new brand into the database.
   */
  async saveBrand(input: inputBrand): Promise<void> {
    const newBrand = new brandDB({
      brand_name: input.brand_name
    });
    await newBrand.save();
  }

  /**
   * Finds a brand by name (excluding a specific brand ID, used in edit scenarios).
   */
  async findBrandInEdit(input: inputBrand): Promise<IBrandModelEntity | null> {
    return await brandDB.findOne({
      _id: { $ne: input._id },
      brand_name: { $regex: new RegExp(`^${input.brand_name}$`, "i") }
    });
  }

  /**
   * Updates a brand's name by its ID.
   */
  async updateBrandById(input: inputBrand): Promise<void> {
    await brandDB.findByIdAndUpdate(input._id, {
      brand_name: input.brand_name
    });
  }

  /**
   * Deletes a brand by its ID.
   */
  async deleteBrandById(_id: string): Promise<void> {
    await brandDB.findByIdAndDelete(_id);
  }

  /**
   * Retrieves a paginated list of brands filtered by search term.
   */
  async findAllListBrand(input: listingInput): Promise<listBrandOutput> {
    const { search, page } = input;
    const skip = page * 5;
    const searchRegex = new RegExp(search, "i");

    const brandList = await brandDB
      .find({ brand_name: { $regex: searchRegex } })
      .skip(skip)
      .limit(5);

    const totalPage = await brandDB.countDocuments({
      brand_name: { $regex: searchRegex }
    }) / 5;

    return {
      data: brandList,
      totalPage
    };
  }
}
