export interface IEstimationMaterialModelEntity {
   _id: string
   material_id: string
   quantity: number
   unit_rate: number
   project_id: string
   createdAt: Date
   updatedAt: Date
}