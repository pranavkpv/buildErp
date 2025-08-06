export interface budgetActualData{
   project_id:string | undefined
   project_name:string 
   budgeted_cost:number | undefined
   actual_expense:number | undefined
}
export interface budgetOutput {
   success:boolean
   message:string
   data:budgetActualData[]
   status_code:number
   totalPage?:number
}