import { toast } from "react-toastify";
import adminAxios from "../../axios/AdminAxioInterceptors"
import type { listingInput } from "../../ApiInterface/CommonApiInterface";
import type { CategoryInput } from "../../ApiInterface/CategoryApiInterface";

/* =========================================================
   CATEGORY API FUNCTIONS
   ========================================================= */

/**
 * Add a new category
 * @param input - category data
 */
export const postCategory = async (input: CategoryInput) => {
  try {
    const response = await adminAxios.post(`/category`, input);
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to add category");
  }
};

/**
 * Get list of categories
 * @param input - listing params
 */
export const categoryList = async (input: listingInput) => {
  try {
    const response = await adminAxios.get(`/category`, { params: input });
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to fetch categories");
  }
};

/**
 * Delete category by ID
 * @param _id - category ID
 */
export const deleteCategoryData = async (_id: string) => {
  try {
    const response = await adminAxios.delete(`/category/${_id}`);
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to delete category");
  }
};

/**
 * Update an existing category
 * @param input - category data with _id
 */
export const putCategory = async (input: CategoryInput) => {
  try {
    const { _id, category_name, description } = input;
    const response = await adminAxios.put(`/category/${_id}`, {
      category_name,
      description,
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to update category");
  }
};
