import { unitDB } from '../../api/models/UnitModel';
import { listingInput } from '../../application/Entities/common.entity';
import { saveUnitInput } from '../../application/Entities/unit.entity';
import { IUnitModelEntity } from '../../domain/Entities/modelEntities/unit.entity';
import { IUnitRepository } from '../../domain/Entities/IRepository/IUnit';

export class UnitRepository implements IUnitRepository {

    // Fetch all units
    async getAllUnits(): Promise<IUnitModelEntity[]> {
        return await unitDB.find();
    }

    // Find unit by name
    async getUnitByName(unitName: string): Promise<IUnitModelEntity | null> {
        return await unitDB.findOne({
            unit_name: { $regex: new RegExp(`${ unitName }$`, 'i') },
        });
    }

    // Create new unit
    async createUnit(input: saveUnitInput): Promise<IUnitModelEntity | null> {
        const { unit_name, short_name } = input;
        const newUnit = new unitDB({ unit_name, short_name });
        return await newUnit.save();
    }

    // Check if unit name already exists while editing
    async checkUnitExistsOnEdit(id: string, unitName: string): Promise<IUnitModelEntity | null> {
        return await unitDB.findOne({
            _id: { $ne: id },
            unit_name: { $regex: new RegExp(`${ unitName }$`, 'i') },
        });
    }

    // Update unit by ID
    async updateUnit(input: saveUnitInput): Promise<IUnitModelEntity | null> {
        const { _id, unit_name, short_name } = input;
        return await unitDB.findByIdAndUpdate(_id, { unit_name, short_name });
    }

    // Delete unit by ID
    async deleteUnit(id: string): Promise<IUnitModelEntity | null> {
        return await unitDB.findByIdAndUpdate(id, { blockStatus: true });
    }

    // Get paginated list of units
    async getPaginatedUnits(input: listingInput): Promise<{ data: IUnitModelEntity[], totalPage: number }> {
        const { page, search } = input;
        const skip = page * 5;
        const searchRegex = new RegExp(search, 'i');

        const unitList = await unitDB
            .find({ unit_name: { $regex: searchRegex }, blockStatus: false })
            .skip(skip)
            .limit(5).sort({ createdAt:-1 });

        const totalDoc = await unitDB.find({ unit_name: { $regex: searchRegex }, blockStatus: false });
        const totalPage = Math.ceil(totalDoc.length /5);

        return { data: unitList, totalPage };
    }

    // Find unit by ID
    async getUnitById(id: string): Promise<IUnitModelEntity | null> {
        return await unitDB.findById(id);
    }
}
