export interface IEstimationModelEntity {
   _id: string
   spec_id: string
   quantity: number
   unit_rate: number
   project_id: string
   approvalStatus:boolean
   rejectStatus:boolean
   reason:string
   createdAt: Date
   updatedAt: Date
}

