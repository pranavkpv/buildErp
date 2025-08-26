import { AttendanceMapper } from "../../application/Mapper/attenadnce.mapper";
import { AddAttendanceUseCase } from "../../application/UseCase/Attendance/AddAttendance";
import { ApproveAttendanceUseCase } from "../../application/UseCase/Attendance/ApproveAttendance";
import { DeleteAttendanceUseCase } from "../../application/UseCase/Attendance/DeleteAttandance";
import { EditAttendanceUseCase } from "../../application/UseCase/Attendance/EditAttendance";
import { FetchAttendanceUseCase } from "../../application/UseCase/Attendance/FetchAttendance";
import { FetchAttendanceByIdUseCase } from "../../application/UseCase/Attendance/FetchAttendanceById";
import { AttendanceRepository } from "../../infrastructure/Repositories/Attendance";
import { AttendanceController } from "../controllers/Attendance";

const attendanceRepository = new AttendanceRepository()
const attendaneMapper = new AttendanceMapper()
const addAttendanceUseCase = new AddAttendanceUseCase(attendanceRepository)
const fetchAttendanceUseCase = new FetchAttendanceUseCase(attendanceRepository)
const deleteAttendanceUseCase = new DeleteAttendanceUseCase(attendanceRepository)
const approveAttendanceUseCase = new ApproveAttendanceUseCase(attendanceRepository)
const fetchAttendanceByIdUseCase = new FetchAttendanceByIdUseCase(attendanceRepository,attendaneMapper)
const editAttendanceUseCase = new EditAttendanceUseCase(attendanceRepository)
export const injectAttendanceController = new AttendanceController(addAttendanceUseCase,fetchAttendanceUseCase,deleteAttendanceUseCase,approveAttendanceUseCase,fetchAttendanceByIdUseCase,editAttendanceUseCase)