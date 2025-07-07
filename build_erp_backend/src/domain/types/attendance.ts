export interface rowData {
   labour_type: string,
   wage: number,
   number: number,
   total: number
}

export interface attendanceInput {
   selectedProject: string,
   selectedDate: string,
   row: rowData[]
}

export interface editAttendanceInput{
   editId:string
   selectedProject: string,
   selectedDate: string,
   row: rowData[]
}

export interface StoreLabour {
   labour_id: string,
   daily_wage: number,
   numberOflabour: number
}

export interface storeAttendance {
   _id: string,
   project_id: string,
   date: string,
   approvalStatus?: boolean,
   labourDetails: StoreLabour[]
}


export interface fetchattendanceData {
   _id:string
   project_name: string,
   project_id: string,
   date: string,
   netAmount: number
}

export interface pageWiseAttendance{
   result:fetchattendanceData[],
   totalPage:number
}


