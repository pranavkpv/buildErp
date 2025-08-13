export interface inputBrand {
   _id?: string
   brand_name: string
}

export interface listBrandOutput {
   data: inputBrand[]
   totalPage?: number
}