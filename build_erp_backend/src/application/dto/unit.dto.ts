export interface idUnitnameDTO {
   _id: string
   unit_name: string
}

export interface listUnitDTO extends idUnitnameDTO {
   short_name: string
}