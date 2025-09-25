import { ILabourRepository } from '../../domain/Entities/IRepository/ILabour';
import { labourDB } from '../../api/models/LabourModel';
import { ILabourModelEntity } from '../../domain/Entities/modelEntities/labour.entity';
import { labourAddInput, labourEditInput, labourSumInput } from '../../application/entities/labour.entity';
import { listingInput } from '../../application/entities/common.entity';

export class LabourRepository implements ILabourRepository {

    //  Calculate total labour wage based on input list
    async calculateTotalLabourWages(input: labourSumInput[]): Promise<number> {
        let sum = 0;
        for (const element of input) {
            const labour = await labourDB.findById(element.labour_id);
            if (labour) {
                sum += labour.daily_wage * element.numberoflabour;
            }
        }
        return sum;
    }

    //  Fetch paginated labour list with search filter
    async getPaginatedLabourList(input: listingInput):
        Promise<{ data: ILabourModelEntity[], totalPage: number }> {
        const { page, search } = input;
        const skip = page * 5;
        const searchRegex = new RegExp(search, 'i');

        const labourList = await labourDB
            .find({ labour_type: { $regex: searchRegex }, blockStatus: false })
            .skip(skip)
            .limit(5).sort({ createdAt:-1 });

        const totalDoc = await labourDB
            .find({ labour_type: { $regex: searchRegex }, blockStatus: false });

        const totalPage = Math.ceil(totalDoc.length / 5);

        return {
            data: labourList,
            totalPage,
        };
    }

    //  Find single labour by type
    async getLabourByType(labourType: string): Promise<ILabourModelEntity | null> {
        return await labourDB.findOne({ labour_type: { $regex: new RegExp(`^${ labourType }$`, 'i') } });
    }

    // Create new labour
    async createLabour(input: labourAddInput): Promise<void> {
        const { labour_type, daily_wage } = input;
        const newLabour = new labourDB({ labour_type, daily_wage });
        await newLabour.save();
    }

    //  Delete labour by ID
    async deleteLabourById(id: string): Promise<void> {
        await labourDB.findByIdAndUpdate(id, { blockStatus: true });
    }

    //  Check duplicate labour during edit
    async checkDuplicateLabourOnEdit(id: string, labourType: string): Promise<ILabourModelEntity | null> {
        return await labourDB.findOne({
            _id: { $ne: id },
            labour_type: { $regex: new RegExp(`^${ labourType }$`, 'i') },
        });
    }

    //  Update labour by ID
    async updateLabour(input: labourEditInput): Promise<void> {
        const { _id, labour_type, daily_wage } = input;
        await labourDB.findByIdAndUpdate(_id, { labour_type, daily_wage });
    }

    //  Get all labours
    async getAllLabours(): Promise<ILabourModelEntity[]> {
        return await labourDB.find();
    }

    //  Get single labour by ID
    async getLabourById(id: string): Promise<ILabourModelEntity | null> {
        return await labourDB.findById(id);
    }
}
