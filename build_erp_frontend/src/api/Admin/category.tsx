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

//delete the category
type deleteData = {
   _id: string
}

export const deleteCategoryData = async (data: deleteData) => {
   const response = await axioInstance.delete(`/admin/category`, { data });
   return response.data
}

//edit category

export const putCategory = async (_id: string, category_name: string, description: string) => {
   const response = await axioInstance.put(`/admin/category`, { _id, category_name, description, });
   return response.data
}