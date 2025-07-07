import axioInstance from "../../api/axio";


//add labour
export const postLabour = async(labour_type:string,daily_wage:number)=>{
   const response = await axioInstance.post(`/admin/labour`, {labour_type,daily_wage});
   return response.data
}

//delete labour
type deleteData ={
   _id:string
}
export const deleteLabourData = async(data:deleteData)=>{
    const response = await axioInstance.delete(`/admin/labour`,{ data } );
    return response.data
}

//edit labour
export const putLabour = async(_id:string,labour_type:string,daily_wage:number)=>{
    const response = await axioInstance.put(`/admin/labour`, {_id,labour_type, daily_wage});
    return response.data
}

//labour list
export const getLabour = async(page:number,search:string)=>{
   const response = await axioInstance.get(`/admin/labour`, { params: { page, search: search } });
   return response.data
}

export const labourDataFetch = async()=>{
   const response = await axioInstance.get('/admin/fetchlabour')
   return response.data
}


