import { ILabourModelEntity } from "../../domain/Entities/modelEntities/labour.entity";
import { ILabourMapper } from "../../domain/mappers/ILabour.mapper";
import { labourDataDisplayDTO } from "../dto/labour.dto";

export class labourMapper implements ILabourMapper {
  toDisplayLabourDTO(labour: ILabourModelEntity[]): labourDataDisplayDTO[] {
    return labour.map((item) => ({
      _id: item._id,
      daily_wage: item.daily_wage,
      labour_type: item.labour_type
    }))
  }
  toFetchLabourDTO(labour: ILabourModelEntity): labourDataDisplayDTO {
    return {
      _id: labour._id,
      daily_wage: labour.daily_wage,
      labour_type: labour.labour_type
    }
  }
}