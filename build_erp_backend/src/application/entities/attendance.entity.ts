
export interface pageWiseAttendance {
   _id: string
   project_name: string
   project_id: string
   date: Date
   netAmount: number
}

export interface RowData {
   labour_type: string;
   wage: number;
   number: number;
   total: number;
}


export interface InputAttendance {
   _id?: string
   selectedProject: string;
   selectedDate: string;
   row: RowData[];
}

type labourtype = {
   labour_id: string
   daily_wage: number
   numberOflabour: number
}

export interface fetchEditAttendance {
   _id: string
   project_id: string
   date: Date
   labourDetails: labourtype[]
}