import axioInstance from "../../api/axio";



//add brand
export const postBrand = async (brand_name: string) => {
   const response = await axioInstance.post(`/admin/brand`, {
      brand_name,
   });
   return response.data
}

//brand list
export const getbrandList = async(page:number,search:string)=>{
    const response = await axioInstance.get(`/admin/brand`, { params: { page, search} });
    return response.data
}

//delete brand
type deleteData ={
   _id:string
}
export const deleteBrandData = async(data:deleteData)=>{
   const response = await axioInstance.delete(`/admin/brand`, {data});
   return response.data
}

//edit brand

export const putBrandData = async(_id:string,brand_name:string)=>{
   const response = await axioInstance.put(`/admin/brand`, {_id,brand_name});
   return response.data
}