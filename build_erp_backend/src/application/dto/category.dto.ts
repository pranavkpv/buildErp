export interface idCategorynameDTO {
   _id: string
   category_name: string
}

export interface categoryListDTO extends idCategorynameDTO {
   description: string
}