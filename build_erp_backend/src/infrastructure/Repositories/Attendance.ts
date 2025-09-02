import { IAttendanceRepository } from '../../domain/Entities/IRepository/IAttendance';
import { attendanceDB } from '../../api/models/AttendanceModel';
import { IAttendanceModelEntity } from '../../domain/Entities/modelEntities/attendance.entity';
import { listingInput } from '../../application/Entities/common.entity';
import { InputAttendance, pageWiseAttendance } from '../../application/Entities/attendance.entity';

export class AttendanceRepository implements IAttendanceRepository {

    // Create a new attendance record
    async createAttendance(input: InputAttendance): Promise<void> {
        const { selectedProject, selectedDate, row } = input;
        const labourDetails = [];
        for (const element of row) {
            labourDetails.push({ labour_id: element.labour_type, daily_wage: element.wage, numberOflabour: element.number });
        }
        const newAttendance = new attendanceDB({
            project_id: selectedProject,
            date: selectedDate,
            labourDetails: labourDetails,
            approvalStatus: false,
        });

        await newAttendance.save();
    }

    // Check if an attendance record already exists for given project and date
    async getAttendanceByProjectAndDate(projectId: string, date: string):
    Promise<IAttendanceModelEntity | null> {
        return await attendanceDB.findOne({ projectId, date });
    }

    // Fetch paginated attendance records (not yet approved)
    async getPendingAttendanceList(input: listingInput):
    Promise<{ data: pageWiseAttendance[], totalPage: number }> {
        const { page, search } = input;
        const skip = page * 5;

        const data = await attendanceDB.aggregate([
            {
                $addFields: {
                    projectObjectId: { $toObjectId: '$project_id' },
                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            },
            { $unwind: '$projectDetails' },
            {
                $match: {
                    approvalStatus: false,
                    'projectDetails.project_name': { $regex: search, $options: 'i' },
                },
            },
            { $skip: skip },
            { $limit: 5 },
        ]);

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
                netAmount: sum,
            });
        }

        const numberOfDocs = await attendanceDB.aggregate([
            {
                $addFields: {
                    projectObjectId: { $toObjectId: '$project_id' },
                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            },
            { $unwind: '$projectDetails' },
            {
                $match: {
                    approvalStatus: false,
                    'projectDetails.project_name': { $regex: search, $options: 'i' },
                },
            },
        ]);

        return {
            data: result,
            totalPage: Math.ceil(numberOfDocs.length / 5),
        };
    }

    // Delete attendance by ID
    async deleteAttendanceById(id: string): Promise<void> {
        await attendanceDB.findByIdAndDelete(id);
    }

    // Approve attendance by ID
    async approveAttendanceById(id: string): Promise<void> {
        await attendanceDB.findByIdAndUpdate(id, { approvalStatus: true });
    }

    // Get attendance by ID
    async getAttendanceById(id: string): Promise<IAttendanceModelEntity | null> {
        return await attendanceDB.findById(id);
    }

    // Check if attendance exists for project/date excluding a specific record (used in edit)
    async getAttendanceForEdit(id: string, projectId: string, date: string):
    Promise<IAttendanceModelEntity | null> {
        return await attendanceDB.findOne({
            _id: { $ne: id },
            project_id: projectId,
            date,
        });
    }

    // Update existing attendance
    async updateAttendance(input: InputAttendance): Promise<void> {
        console.log(input);
        const { _id, selectedProject, selectedDate, row } = input;
        const labourDetails = [];
        for (const element of row) {
            labourDetails.push({ labour_id: element.labour_type, daily_wage: element.wage, numberOflabour: element.number });
        }
        await attendanceDB.findByIdAndUpdate(_id, {
            project_id: selectedProject,
            date: selectedDate,
            labourDetails: labourDetails,
        });
    }

    // Get all approved attendance records
    async getApprovedAttendance(): Promise<IAttendanceModelEntity[]> {
        return await attendanceDB.find({ approvalStatus: true });
    }
    //get attendance detail by project Id
    async getAttendanceBylabourId(id: string): Promise<IAttendanceModelEntity | null> {
        return await attendanceDB.findOne({labourDetails:{$elemMatch:{labour_id:id}}})
    }
    //get attendance by project id
    async getAttendanceByProjectId(id: string): Promise<IAttendanceModelEntity | null> {
        return await attendanceDB.findOne({project_id:id})
    }
    // get all un approved attendance
    async getUnApprovedAttendanceByProjectId(id: string): Promise<IAttendanceModelEntity[]> {
        return await attendanceDB.find({project_id:id,approvalStatus:false})
    }
}
