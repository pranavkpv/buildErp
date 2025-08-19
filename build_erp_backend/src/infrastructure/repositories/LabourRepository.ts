import { ILabourRepository } from "../../domain/interfaces/Labour-management/ILabourRepository";
import { labourDB } from "../../api/models/LabourModel";
import { ILabourModelEntity } from "../../domain/Entities/modelEntities/labour.entity";
import { labourAddInput, labourSumInput } from "../../application/entities/labour.entity";


/**
 * LabourRepository
 * 
 * Handles all database operations related to Labour management.
 * Implements the `ILabourRepositoryEntity` interface.
 */
export class LabourRepository implements ILabourRepository {

   async findSumofLabouor(input:labourSumInput[]): Promise<number> {
      let sum = 0;
      for (const element of input) {
         const labour = await labourDB.findById(element.labour_id);
         if (labour) {
            sum += labour.daily_wage * element.numberoflabour;
         }
      }
      return sum;
   }

   

   async findAllLabour(input: listingInput): Promise<labourOutput> {
      const { page, search } = input;
      const skip = page * 5;
      const searchRegex = new RegExp(search, "i");

      const labourList = await labourDB
         .find({ labour_type: { $regex: searchRegex } })
         .skip(skip)
         .limit(5);

      const totalPage = await labourDB.countDocuments({ labour_type: { $regex: searchRegex } }) / 5;

      return {
         data: labourList,
         totalPage
      };
   }

   /**
    * Finds a labour by its type (case-insensitive).
    * @param labour_type - Type of the labour.
    * @returns Labour document if found, otherwise null.
    */
   async findLabourByType(labour_type: string): Promise<ILabourModelEntity | null> {
      return await labourDB.findOne({ labour_type: { $regex: new RegExp(`^${ labour_type }$`, "i") } });
   }

   /**
    * Saves a new labour record to the database.
    * @param input - Contains labour type and daily wage.
    */
   async saveLabour(input: labourAddInput): Promise<void> {
      const { labour_type, daily_wage } = input;
      const newLabour = new labourDB({ labour_type, daily_wage });
      await newLabour.save();
   }

   /**
    * Deletes a labour record by its ID.
    * @param _id - The ID of the labour to delete.
    */
   async deleteLabourById(_id: string): Promise<void> {
      await labourDB.findByIdAndDelete(_id);
   }

   /**
    * Checks if another labour with the same type exists while editing.
    * @param input - Contains labour ID and labour type.
    * @returns Existing labour document if found, otherwise null.
    */
   async findLabourInEdit(input: inputLabour): Promise<ILabourModelEntity | null> {
      const { _id, labour_type } = input;
      return await labourDB.findOne({
         _id: { $ne: _id },
         labour_type: { $regex: new RegExp(`^${ labour_type }$`, "i") }
      });
   }

   /**
    * Updates a labour's details by its ID.
    * @param input - Contains labour ID, labour type, and daily wage.
    */
   async updateLabourById(input: inputLabour): Promise<void> {
      const { _id, labour_type, daily_wage } = input;
      await labourDB.findByIdAndUpdate(_id, { labour_type, daily_wage });
   }

   /**
    * Fetches all labour records without pagination or filtering.
    * @returns An array of all labour documents.
    */
   async fetchLabourData(): Promise<ILabourModelEntity[] | []> {
      return await labourDB.find();
   }

   /**
    * Finds a labour by its ID.
    * @param _id - The ID of the labour.
    * @returns Labour document if found, otherwise null.
    */
   async findLabourById(_id: string): Promise<ILabourModelEntity | null> {
      return await labourDB.findById(_id);
   }


}
