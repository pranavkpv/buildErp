import { IUnitRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IUnitRepository";
import { unitDB } from "../../Database/Model/UnitModel";
import { IUnitModelEntity } from "../../Entities/ModelEntities/Unit.Entity";
import { inputUnit, listUnitOutput } from "../../DTO/UnitEntities/Unit.Entity";

/**
 * UnitRepository handles database operations for Unit entities.
 * Implements the IUnitRepositoryEntity interface.
 */
export class UnitRepository implements IUnitRepositoryEntity {

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
    async findUnitByunit_name(input: inputUnit): Promise<IUnitModelEntity | null> {
        const { unit_name } = input;
        return await unitDB.findOne({
            unit_name: { $regex: new RegExp(`${unit_name}$`, "i") }
        });
    }

    /**
     * Save a new unit.
     */
    async saveUnit(input: inputUnit): Promise<IUnitModelEntity | null> {
        const { unit_name, short_name } = input;
        const newUnit = new unitDB({ unit_name, short_name });
        return await newUnit.save();
    }

    /**
     * Check if a unit name exists while editing (excluding current _id).
     */
    async findUnitInEdit(input: inputUnit): Promise<IUnitModelEntity | null> {
        const { _id, unit_name } = input;
        return await unitDB.findOne({
            _id: { $ne: _id },
            unit_name: { $regex: new RegExp(`${unit_name}$`, "i") }
        });
    }

    /**
     * Update a unit by ID.
     */
    async updateUnitById(input: inputUnit): Promise<IUnitModelEntity | null> {
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
    async findAllListUnit(page: number, search: string): Promise<listUnitOutput> {
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

    /**
     * Find a unit by ID.
     */
    async findUnitById(_id: string): Promise<IUnitModelEntity | null> {
        return await unitDB.findById(_id);
    }
}
