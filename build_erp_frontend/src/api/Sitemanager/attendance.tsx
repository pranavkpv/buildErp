import axioInstance from "../../api/axio"

type rowData = {
   labour_type: string,
   wage: number,
   number: number,
   total: number
}
export const takeAttendanceAPI = async (selectedProject: string, selectedDate: string, row:rowData[])=>{
   const result = await axioInstance.post("/site/attendance",{selectedProject,selectedDate,row})
   return result.data
}

export const fetchAttendanceAPI = async (search:string, page:number)=>{
   const result = await axioInstance.get("/site/attendance",{params:{search,page}})
   return result.data
}

export const DeleteAttendanceAPI =async(deleteId:string)=>{
   const result = await axioInstance.delete(`/site/attendance/${deleteId}`)
   return result.data
}

export const approveAttendanceAPI = async(approveId:string)=>{
   const result = await axioInstance.put(`/site/attendance/${approveId}`)
   return result.data
}

export const getAttendanceBYIdAPI = async(editId:string)=>{
   const result  = await axioInstance.get(`/site/editfetchattendance/${editId}`)
   return result.data
}

export const editAttendanceAPI = async(editId:string,selectedProject:string, selectedDate:string, row:rowData[])=>{
   const result = await axioInstance.put("/site/editAttendance",{editId,selectedProject,selectedDate,row})
   return result.data
}