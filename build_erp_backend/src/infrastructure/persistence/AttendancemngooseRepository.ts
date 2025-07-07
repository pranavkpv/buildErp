import mongoose from "mongoose";
import { IAttendanceRepository } from "../../domain/repositories/IAttendanceRepository";
import { fetchattendanceData, pageWiseAttendance, storeAttendance, StoreLabour } from "../../domain/types/attendance";
import AttendanceModel from "../../models/AttendanceModel";

export class AttendancemongooseRepository implements IAttendanceRepository {
  async SaveAttendance(project_id: string, date: string, labourDetails: StoreLabour[]): Promise<void> {
    const newAttendance = new AttendanceModel({
      project_id,
      date,
      labourDetails,
      approvalStatus: false
    })
    await newAttendance.save()
  }
  async findExistAttendance(project_id: string, date: string): Promise<storeAttendance | null> {
    const existData = await AttendanceModel.findOne({ project_id, date })
    return existData ? existData : null
  }
  async fetchAttendance(search: string, page: number): Promise<pageWiseAttendance | null> {
    const skip = page * 5
    const data = await AttendanceModel.aggregate([
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

    const numberOfdoc = await AttendanceModel.countDocuments({ approvalStatus: false })
    return { result: result, totalPage: Math.ceil(numberOfdoc / 5) }

  }
  async deleteAttendance(_id: string): Promise<void> {
    await AttendanceModel.findByIdAndDelete(_id)
  }
  async approveAttendance(_id: string): Promise<void> {
    await AttendanceModel.findByIdAndUpdate(_id, { approvalStatus: true })
  }
  async findAttendanceById(_id: string): Promise<storeAttendance | null> {

    const data = await AttendanceModel.findById(_id)
    return data ? data : null
  }
  async findExistInEdit(_id: string, project_id: string, date: string): Promise<storeAttendance | null> {
    const existData = await AttendanceModel.findOne({ _id: { $ne: _id }, project_id, date })
    return existData ? existData : null
  }
  async UpdateAttendance(_id: string, project_id: string, date: string, labourDetails: StoreLabour[]): Promise<void> {
      await AttendanceModel.findByIdAndUpdate(_id,{project_id,date,labourDetails})
  }

}