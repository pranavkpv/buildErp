import axioInstance from "../../api/axio";


//add category 
export const postCategory = async (category_name: string, description: string) => {
   const response = await axioInstance.post(`/admin/category`, { category_name, description });
   return response.data
}

//list the category

export const categoryList = async (page: number, search: string) => {
   const response = await axioInstance.get(`/admin/category`, { params: { page, search } });
   return response.data
}



export const deleteCategoryData = async (_id:string) => {
   const response = await axioInstance.delete(`/admin/category/${_id}`);
   return response.data
}

//edit category

export const putCategory = async (_id: string, category_name: string, description: string) => {
   const response = await axioInstance.put(`/admin/category/${_id}`, { category_name, description, });
   return response.data
}