interface ILabourDetail{
   labour_id :string
   daily_wage: number
   numberOflabour:number
}


export interface IAttendanceModelEntity {
   project_id :string
   date : string
   approvalStatus :boolean
   labourDetails:ILabourDetail[]
}