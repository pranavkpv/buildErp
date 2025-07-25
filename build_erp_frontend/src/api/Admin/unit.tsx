import axioInstance from "../../api/axio";


//add unit
export const postUnit = async (unit_name: string, short_name: string) => {
   const response = await axioInstance.post(`/admin/unit`, { unit_name, short_name, });
   return response.data
}

export const deleteUnitData = async (_id:string) => {
   const response = await axioInstance.delete(`/admin/unit/${_id}`);
   return response.data
}

//edit unit
export const editUnitData = async (_id: string, unit_name: string, short_name: string) => {
   const response = await axioInstance.put(`/admin/unit/${_id}`, { unit_name, short_name, });
   return response.data
}

//list all unit
export const getUnit = async(page:number,search:string) =>{
    const response = await axioInstance.get(`/admin/unit`, { params: { page, search } });
    return response.data
}

//fetch all unit in list
export const fetchUnitData = async()=>{
   const response = await axioInstance.get('/admin/getUnit')
   return response.data
}