import { IAttendanceRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { attendanceDB } from "../../Database/Model/AttendanceModel";
import { IAttendanceModelEntity } from "../../Entities/ModelEntities/Attendance.Entity";
import { InputAttendance, pageWiseAttendance } from "../../DTO/LabourEntities/attendance";
import { listingInput } from "../../DTO/CommonEntities/common";

/**
 * Repository class for handling Attendance-related database operations.
 */
export class AttendanceRepository implements IAttendanceRepositoryEntity {

  /**
   * Saves a new attendance record for a project.
   * 
   * @param input - Attendance details including project, date, and labour details.
   */
  async SaveAttendance(input: InputAttendance): Promise<void> {
    const { project_id, date, labourDetails } = input;

    const newAttendance = new attendanceDB({
      project_id,
      date,
      labourDetails,
      approvalStatus: false
    });

    await newAttendance.save();
  }

  /**
   * Checks if an attendance record already exists for the given project and date.
   * 
   * @param project_id - ID of the project.
   * @param date - Attendance date.
   */
  async findExistAttendance(
    project_id: string,
    date: string
  ): Promise<IAttendanceModelEntity | null> {
    return await attendanceDB.findOne({ project_id, date });
  }

  /**
   * Fetches paginated attendance records with project details and calculates net amounts.
   * 
   * @param input - Pagination and search parameters.
   * @returns Paginated attendance data with total pages.
   */
  async fetchAttendance(input: listingInput): Promise<pageWiseAttendance | null> {
    const { page, search } = input;
    const skip = page * 5;

    // Aggregation to get paginated attendance records
    const data = await attendanceDB.aggregate([
      {
        $addFields: {
          projectObjectId: { $toObjectId: "$project_id" }
        }
      },
      {
        $lookup: {
          from: "projects",
          localField: "projectObjectId",
          foreignField: "_id",
          as: "projectDetails"
        }
      },
      { $unwind: "$projectDetails" },
      {
        $match: {
          approvalStatus: false,
          "projectDetails.project_name": { $regex: search, $options: "i" }
        }
      },
      { $skip: skip },
      { $limit: 5 }
    ]);

    // Calculate net amount for each record
    const result = [];
    for (const item of data) {
      let sum = 0;
      for (const x of item.labourDetails) {
        sum += x.daily_wage * x.numberOflabour;
      }
      result.push({
        _id: item._id,
        project_name: item.projectDetails.project_name,
        project_id: item.project_id,
        date: item.date,
        netAmount: sum
      });
    }

    // Aggregation to count total matching documents
    const numberOfdoc = await attendanceDB.aggregate([
      {
        $addFields: {
          projectObjectId: { $toObjectId: "$project_id" }
        }
      },
      {
        $lookup: {
          from: "projects",
          localField: "projectObjectId",
          foreignField: "_id",
          as: "projectDetails"
        }
      },
      { $unwind: "$projectDetails" },
      {
        $match: {
          approvalStatus: false,
          "projectDetails.project_name": { $regex: search, $options: "i" }
        }
      }
    ]);

    return {
      result,
      totalPage: Math.ceil(numberOfdoc.length / 5)
    };
  }

  /**
   * Deletes an attendance record by ID.
   */
  async deleteAttendance(_id: string): Promise<void> {
    await attendanceDB.findByIdAndDelete(_id);
  }

  /**
   * Approves an attendance record.
   */
  async approveAttendance(_id: string): Promise<void> {
    await attendanceDB.findByIdAndUpdate(_id, { approvalStatus: true });
  }

  /**
   * Finds an attendance record by its ID.
   */
  async findAttendanceById(_id: string): Promise<IAttendanceModelEntity | null> {
    return await attendanceDB.findById(_id);
  }

  /**
   * Checks if an attendance record exists for the given project and date
   * excluding the given attendance ID (for edit scenarios).
   */
  async findExistInEdit(
    _id: string,
    project_id: string,
    date: string
  ): Promise<IAttendanceModelEntity | null> {
    return await attendanceDB.findOne({
      _id: { $ne: _id },
      project_id,
      date
    });
  }

  /**
   * Updates an existing attendance record.
   */
  async UpdateAttendance(input: InputAttendance): Promise<void> {
    const { _id, project_id, date, labourDetails } = input;
    await attendanceDB.findByIdAndUpdate(_id, { project_id, date, labourDetails });
  }

  /**
   * Retrieves all approved attendance records.
   */
  async findAllAttendance(): Promise<IAttendanceModelEntity[]> {
    return await attendanceDB.find({ approvalStatus: true });
  }
}
