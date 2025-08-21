import { toast } from "react-toastify";
import adminAxios from "../../axios/AdminAxioInterceptors"
import type { listingInput } from "../../ApiInterface/CommonApiInterface";
import type { CategoryInput } from "../../ApiInterface/CategoryApiInterface";

/* =========================================================
   CATEGORY API FUNCTIONS
   ========================================================= */

export const postCategory = async (input: CategoryInput) => {
  const response = await adminAxios.post(`/category`, input);
  return response.data;
};

/**
 * Get list of categories
 * @param input - listing params
 */
export const categoryList = async (input: listingInput) => {
  const response = await adminAxios.get(`/category`, { params: input });
  return response.data;
};

/**
 * Delete category by ID
 * @param _id - category ID
 */
export const deleteCategoryData = async (_id: string) => {
  const response = await adminAxios.delete(`/category/${ _id }`);
  return response.data;
};

/**
 * Update an existing category
 * @param input - category data with _id
 */
export const putCategory = async (input: CategoryInput) => {
    const { _id, category_name, description } = input;
    const response = await adminAxios.put(`/category/${ _id }`, {
      category_name,
      description,
    });
    return response.data;
};
