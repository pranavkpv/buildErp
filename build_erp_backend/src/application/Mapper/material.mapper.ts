import { IMaterialModelEntity } from '../../domain/Entities/modelEntities/material.entity';
import { IMaterialMapper } from '../../domain/IMappers/IMaterial.mapper';
import { EditmaterialDetailsDTO, EditprojectDetailsDTO, listingMaterialDTO, stockDTO, unitRateDTO } from '../dto/material.dto';
import { projectStockListDTO } from '../dto/transfer.dto';
import { editMaterialFullDatafetch, stockDisplayAggregate } from '../Entities/material.entity';
import { ProjectStockOutput } from '../Entities/project.entity';
import { listProjectStock } from '../Entities/transfer.entity';

export class MaterialMapper implements IMaterialMapper {
    tolistingMaterialDTO(material: editMaterialFullDatafetch[]): listingMaterialDTO[] {
        return material.map((element) => ({
            _id: element._id,
            brandDetails: element.brandDetails.map((item) => ({
                _id: item._id,
                brand_name: item.brand_name,
            })),
            categoryDetails: element.categoryDetails.map((item) => ({
                _id: item._id,
                category_name: item.category_name,
            })),
            unitDetails: element.unitDetails.map((item) => ({
                _id: item._id,
                unit_name: item.unit_name,
            })),
            material_name: element.material_name,
            unit_rate: element.unit_rate,
        }));
    }
    toEditMaterialDTO(material: editMaterialFullDatafetch): EditmaterialDetailsDTO {
        return {
            brand_id: material.brand_id,
            category_id: material.category_id,
            material_name: material.material_name,
            stock: material.stock,
            unit_id: material.unit_id,
            unit_rate: material.unit_rate,
        };
    }
    toEditProjectStockDTO(project: ProjectStockOutput[]): EditprojectDetailsDTO[] {
        return project.map((item) => ({
            _id: item._id,
            project: item.project_id,
            stock: item.stock,
        }));
    }
    toUniRateDTO(material: IMaterialModelEntity): unitRateDTO {
        return {
            material_id: material._id,
            unit_rate: material.unit_rate,
        };
    }
    toStockDisplayDTO(material: stockDisplayAggregate[]): stockDTO[] {
        return material.map((item) => ({
            _id: item._id,
            brand_name: item.brandDetails.brand_name,
            material_name: item.materialDetails.material_name,
            unit_name: item.unitDetails.unit_name,
            stock: item.stock,
        }));
    }
    toListStockDTO(stock: listProjectStock[]): projectStockListDTO[] {
        return stock.map((element) => ({
            material_name: element.materialDetails.material_name,
            brand_name: element.brandDetails.brand_name,
            material_id: element.materialDetails._id,
            stock: element.stock,
            unit_name: element.unitDetails.unit_name,
            unit_rate: element.materialDetails.unit_rate,
        }));
    }
}