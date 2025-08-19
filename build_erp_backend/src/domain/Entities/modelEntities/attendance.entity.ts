interface ILabourDetail{
   _id:string
   labour_id :string
   daily_wage: number
   numberOflabour:number
}


export interface IAttendanceModelEntity {
   _id:string
   project_id :string
   date : Date
   approvalStatus :boolean
   labourDetails:ILabourDetail[]
   createdAt: Date
   updatedAt: Date
}