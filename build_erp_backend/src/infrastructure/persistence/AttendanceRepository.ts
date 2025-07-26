
import { IAttendanceRepository } from "../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { pageWiseAttendance, storeAttendance, StoreLabour } from "../../Entities/Input-OutputEntities/LabourEntities/attendance";
import { attendanceDB } from "../../Database/Model/AttendanceModel";
import { IAttendanceModelEntity } from "../../Entities/ModelEntities/Attendance.Entity";

export class AttendanceRepository implements IAttendanceRepository {
  async SaveAttendance(project_id: string, date: string, labourDetails: StoreLabour[]): Promise<void> {
    const newAttendance = new attendanceDB({
      project_id,
      date,
      labourDetails,
      approvalStatus: false
    })
    await newAttendance.save()
  }

  async findExistAttendance(project_id: string, date: string): Promise<IAttendanceModelEntity | null> {
    const existData = await attendanceDB.findOne({ project_id, date })
    return existData
  }

  async fetchAttendance(search: string, page: number): Promise<pageWiseAttendance | null> {
    const skip = page * 5
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
      {
        $unwind: "$projectDetails"
      }, {
        $match: {
          approvalStatus: false,
          "projectDetails.project_name": { $regex: search, $options: "i" }
        }
      }, { $skip: skip }, { $limit: 5 }
    ]);
    const result = []
    for (let item of data) {
      let sum = 0
      for (let x of item.labourDetails) {
        sum += (x.daily_wage * x.numberOflabour)
      }
      result.push({ _id: item._id, project_name: item.projectDetails.project_name, project_id: item.project_id, date: item.date, netAmount: sum })
      sum = 0
    }

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
      {
        $unwind: "$projectDetails"
      }, {
        $match: {
          approvalStatus: false,
          "projectDetails.project_name": { $regex: search, $options: "i" }
        }
      }
    ]);
    
    return { result: result, totalPage: Math.ceil(numberOfdoc.length / 5) }

  }

  async deleteAttendance(_id: string): Promise<void> {
    await attendanceDB.findByIdAndDelete(_id)
  }

  async approveAttendance(_id: string): Promise<void> {
    await attendanceDB.findByIdAndUpdate(_id, { approvalStatus: true })
  }

  async findAttendanceById(_id: string): Promise<IAttendanceModelEntity | null> {
    const data = await attendanceDB.findById(_id)
    return data
  }
  async findExistInEdit(_id: string, project_id: string, date: string): Promise<IAttendanceModelEntity | null> {
    const existData = await attendanceDB.findOne({ _id: { $ne: _id }, project_id, date })
    return existData
  }
  async UpdateAttendance(_id: string, project_id: string, date: string, labourDetails: StoreLabour[]): Promise<void> {
    await attendanceDB.findByIdAndUpdate(_id, { project_id, date, labourDetails })
  }

}