export interface listUnitOutput {
   data: inputUnit[]
   totalPage?: number
}
export interface inputUnit {
   _id?: string
   unit_name: string
   short_name?: string
}