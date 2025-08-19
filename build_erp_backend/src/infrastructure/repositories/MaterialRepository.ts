import mongoose from "mongoose";
import { IMaterialRepository } from "../../domain/interfaces/Material-management/IMaterialRepository";
import {
  addMaterialInput,
  findMaterialBynameCatBrandInput,
  getMaterialEditData,
  materialOutput,
  unitRateInput
} from "../../application/dto/MaterialEntities/material";
import { materialDB } from "../../api/models/MaterialModel";
import { projectDB } from "../../api/models/ProjectModel";
import { unitDB } from "../../api/models/UnitModel";
import { brandDB } from "../../api/models/BrandModel";
import { IProjectModelEntity } from "../../domain/Entities/modelEntities/project.entity";
import { IMaterialModelEntity } from "../../domain/Entities/modelEntities/material.entity";
import { listingInput } from "../../application/dto/CommonEntities/common";
import { materialSumInput } from "../../application/entities/material.entity";


export class MaterialRepository implements IMaterialRepository {

  async findSumOfMaterial(input:materialSumInput[]): Promise<number> {
    let sum = 0;
    for (const element of input) {
      const material = await materialDB.findById(element.material_id);
      if (material) {
        sum += material.unit_rate * element.quantity;
      }
    }
    return sum;
  }


  async findAllMaterial(input: listingInput): Promise<materialOutput> {
    const { page, search } = input;
    const skip = page * 5;
    const searchRegex = new RegExp(search, "i");

    const MaterialData = await materialDB.aggregate([
      {
        $addFields: {
          categoryObjectId: { $toObjectId: "$category_id" },
          unitObjectId: { $toObjectId: "$unit_id" },
          brandObjectId: { $toObjectId: "$brand_id" }
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryObjectId",
          foreignField: "_id",
          as: "categoryDetails"
        }
      },
      {
        $lookup: {
          from: "units",
          localField: "unitObjectId",
          foreignField: "_id",
          as: "unitDetails"
        }
      },
      {
        $lookup: {
          from: "brands",
          localField: "brandObjectId",
          foreignField: "_id",
          as: "brandDetails"
        }
      },
      { $match: { material_name: { $regex: searchRegex } } },
      { $skip: skip },
      { $limit: 5 }
    ]);

    const totalPage = await materialDB.countDocuments({ material_name: { $regex: searchRegex } }) / 5;

    return { data: MaterialData, totalPage };
  }

  /**
   * Retrieves all projects from the database.
   * @returns Array of project documents.
   */
  async findAllProject(): Promise<IProjectModelEntity[] | []> {
    return await projectDB.find();
  }

  /**
   * Finds a material by name, category, and brand (case-insensitive).
   */
  async findMaterailWithNameCategoryBrand(
    input: findMaterialBynameCatBrandInput
  ): Promise<IMaterialModelEntity | null> {
    const { material_name, category_id, brand_id } = input;
    return await materialDB.findOne({
      material_name: { $regex: new RegExp(`^${ material_name }$`, "i") },
      category_id,
      brand_id
    });
  }

  /**
   * Saves a new material.
   */
  async saveMaterial(input: addMaterialInput): Promise<IMaterialModelEntity> {
    const { material_name, category_id, brand_id, unit_id, unit_rate, stock } = input;
    const newMaterial = new materialDB({
      material_name,
      category_id,
      brand_id,
      unit_id,
      unit_rate,
      stock
    });
    return await newMaterial.save();
  }

  /**
   * Retrieves a material with its category, brand, and unit details by ID.
   */
  async findMaterialById(_id: string): Promise<getMaterialEditData | null> {
    const objectId = new mongoose.Types.ObjectId(_id);
    const materialData = await materialDB.aggregate([
      { $match: { _id: objectId } },
      {
        $addFields: {
          categoryObjectId: { $toObjectId: "$category_id" },
          brandObjectId: { $toObjectId: "$brand_id" },
          unitObjectId: { $toObjectId: "$unit_id" }
        }
      },
      {
        $lookup: {
          from: "category",
          localField: "categoryObjectId",
          foreignField: "_id",
          as: "categoryDetails"
        }
      },
      {
        $lookup: {
          from: "brand",
          localField: "brandObjectId",
          foreignField: "_id",
          as: "brandDetails"
        }
      },
      {
        $lookup: {
          from: "unit",
          localField: "unitObjectId",
          foreignField: "_id",
          as: "unitDetails"
        }
      }
    ]);
    return materialData[0] || null;
  }

  /**
   * Checks for duplicate material during edit.
   */
  async findMaterialInEdit(
    input: findMaterialBynameCatBrandInput
  ): Promise<IMaterialModelEntity | null> {
    const { _id, material_name, category_id, brand_id } = input;
    return await materialDB.findOne({
      _id: { $ne: _id },
      material_name: { $regex: new RegExp(`^${ material_name }$`, "i") },
      category_id,
      brand_id
    });
  }

  /**
   * Updates an existing material by ID.
   */
  async updateMaterialById(input: addMaterialInput): Promise<void> {
    const { _id, material_name, category_id, brand_id, unit_id, unit_rate, stock } = input;
    await materialDB.findByIdAndUpdate(_id, {
      material_name,
      category_id,
      brand_id,
      unit_id,
      unit_rate,
      stock
    });
  }

  /**
   * Deletes a material by ID.
   */
  async deleteMaterialById(_id: string): Promise<void> {
    await materialDB.findByIdAndDelete(_id);
  }

  /**
   * Finds a material by its brand ID.
   */
  async findMaterialByBrandId(brand_id: string): Promise<IMaterialModelEntity | null> {
    return await materialDB.findOne({ brand_id });
  }

  /**
   * Finds a material by its category ID.
   */
  async findMaterialByCategoryId(category_id: string): Promise<IMaterialModelEntity | null> {
    return await materialDB.findOne({ category_id });
  }

  /**
   * Finds a material by its unit ID.
   */
  async findMaterialByUnitId(unit_id: string): Promise<IMaterialModelEntity | null> {
    return await materialDB.findOne({ unit_id });
  }

  /**
   * Retrieves all unique material names.
   */
  async findAllUniqueMaterial(): Promise<string[]> {
    return await materialDB.distinct("material_name");
  }

  /**
   * Retrieves all unit names for a given material name.
   */
  async findUnitByMaterialName(material_name: string): Promise<string[]> {
    const result = await materialDB.find({ material_name }).distinct("unit_id");
    return await unitDB.find({ _id: { $in: result } }).distinct("unit_name");
  }

  /**
   * Retrieves all brand names for a given material name.
   */
  async findBrandByMaterialName(material_name: string): Promise<string[]> {
    const result = await materialDB.find({ material_name }).distinct("brand_id");
    return await brandDB.find({ _id: { $in: result } }).distinct("brand_name");
  }

  /**
   * Finds the unit rate of a material by its name, brand, and unit.
   */
  async findUnitRate(input: unitRateInput): Promise<IMaterialModelEntity | null> {
    const { material_name, brand_name, unit_name } = input;
    const brandId = await brandDB.findOne({ brand_name });
    const unitId = await unitDB.findOne({ unit_name });
    return await materialDB.findOne({
      material_name,
      brand_id: brandId?._id,
      unit_id: unitId?._id
    });
  }



}
