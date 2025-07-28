import { toast } from "react-toastify";
import axioInstance from "../../api/axio";


// --------------- add category --------------- //
export const postCategory = async (category_name: string, description: string) => {
   try {
      const response = await axioInstance.post(`/admin/category`, { category_name, description });
      return response.data
   } catch (error: any) {
      toast.error(error.message)
   }
}

// ---------------list the category --------------- //

export const categoryList = async (page: number, search: string) => {
   try {
      const response = await axioInstance.get(`/admin/category`, { params: { page, search } });
      console.log(response)
      return response.data
   } catch (error: any) {
      toast.error(error.message)
   }
}

// --------------- Delete category --------------- //

export const deleteCategoryData = async (_id: string) => {
   try {
      const response = await axioInstance.delete(`/admin/category/${ _id }`);
      return response.data
   } catch (error: any) {
      toast.error(error.message)
   }
}

// --------------- edit category --------------- //

export const putCategory = async (_id: string, category_name: string, description: string) => {
   try {
      const response = await axioInstance.put(`/admin/category/${ _id }`, { category_name, description, });
      return response.data
   } catch (error: any) {
      toast.error(error.message)
   }
}