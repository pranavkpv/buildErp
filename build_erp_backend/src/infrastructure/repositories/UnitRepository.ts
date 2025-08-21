import { unitDB } from "../../api/models/UnitModel";
import { listingInput } from "../../application/entities/common.entity";
import { saveUnitInput } from "../../application/entities/unit.entity";
import { IUnitModelEntity } from "../../domain/Entities/modelEntities/unit.entity";
import { IUnitRepository } from "../../domain/interfaces/Material-management/IUnitRepository";


/**
 * UnitRepository handles database operations for Unit entities.
 * Implements the IUnitRepositoryEntity interface.
 */
export class UnitRepository implements IUnitRepository {

    /**
     * Find all units.
     */
    async findUnit(): Promise<IUnitModelEntity[]> {
        const data = await unitDB.find();
        return data
    }

    /**
     * Find a unit by unit_name (case-insensitive).
     */
    async findUnitByunit_name(unit_name:string): Promise<IUnitModelEntity | null> {
        return await unitDB.findOne({
            unit_name: { $regex: new RegExp(`${unit_name}$`, "i") }
        });
    }

    /**
     * Save a new unit.
     */
    async saveUnit(input: saveUnitInput): Promise<IUnitModelEntity | null> {
        const { unit_name, short_name } = input;
        const newUnit = new unitDB({ unit_name, short_name });
        return await newUnit.save();
    }

    /**
     * Check if a unit name exists while editing (excluding current _id).
     */
    async findUnitInEdit(_id:string,unit_name:string): Promise<IUnitModelEntity | null> {
        return await unitDB.findOne({
            _id: { $ne: _id },
            unit_name: { $regex: new RegExp(`${unit_name}$`, "i") }
        });
    }

    /**
     * Update a unit by ID.
     */
    async updateUnitById(input: saveUnitInput): Promise<IUnitModelEntity | null> {
        const { _id, unit_name, short_name } = input;
        return await unitDB.findByIdAndUpdate(_id, { unit_name, short_name });
    }

    /**
     * Delete a unit by ID.
     */
    async deleteUnitById(_id: string): Promise<IUnitModelEntity | null> {
        return await unitDB.findByIdAndDelete(_id);
    }

    /**
     * Find all units with pagination and search filter.
     */
    async findAllListUnit(input:listingInput): Promise<{data:IUnitModelEntity[],totalPage:number}> {
        const {page,search} = input
        const skip = page * 5;
        const searchRegex = new RegExp(search, "i");

        const unitList = await unitDB
            .find({ unit_name: { $regex: searchRegex } })
            .skip(skip)
            .limit(5);

        const totalPage = (await unitDB.countDocuments({
            unit_name: { $regex: searchRegex }
        })) / 5;

        return { data: unitList, totalPage };
    }

   
    async findUnitById(_id: string): Promise<IUnitModelEntity | null> {
        return await unitDB.findById(_id);
    }
}
