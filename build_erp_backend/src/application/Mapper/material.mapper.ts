import { IMaterialMapper } from "../../domain/mappers/IMaterial.mapper";
import { EditmaterialDetailsDTO, EditprojectDetailsDTO, listingMaterialDTO } from "../dto/material.dto";
import { editMaterialFullDatafetch } from "../entities/material.entity";
import { ProjectStockOutput } from "../entities/project.entity";

export class materialMapper implements IMaterialMapper {
   tolistingMaterialDTO(material: editMaterialFullDatafetch[]): listingMaterialDTO[] {
      return material.map((element) => ({
         _id: element._id,
         brandDetails: element.brandDetails.map((item) => ({
            _id: item._id,
            brand_name: item.brand_name
         })),
         categoryDetails: element.categoryDetails.map((item) => ({
            _id: item._id,
            category_name: item.category_name
         })),
         unitDetails: element.unitDetails.map((item) => ({
            _id: item._id,
            unit_name: item.unit_name
         })),
         material_name: element.material_name,
         unit_rate: element.unit_rate
      }))
   }
   toEditMaterialDTO(material: editMaterialFullDatafetch): EditmaterialDetailsDTO {
      return {
         brand_id: material.brand_id,
         category_id: material.brand_id,
         material_name: material.material_name,
         stock: material.stock,
         unit_id: material.unit_id,
         unit_rate: material.unit_rate
      }
   }
   toEditProjectStockDTO(project: ProjectStockOutput[]): EditprojectDetailsDTO[] {
      return project.map((item)=>({
         _id:item._id,
         project:item.project_id,
         stock:item.stock
      }))
   }

}