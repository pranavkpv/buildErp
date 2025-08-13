export interface listCategoryOutput {
   data: categoryInput[]
   totalPage: number
}

export interface categoryInput {
   _id?:string
   category_name:string
   description?:string
}