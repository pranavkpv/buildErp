import adminAxios from "../../axios/adminAxios";
/* =========================================================
   CATEGORY API FUNCTIONS
   ========================================================= */
export const postCategory = async (input) => {
    const response = await adminAxios.post(`/category`, input);
    return response.data;
};
/**
 * Get list of categories
 * @param input - listing params
 */
export const categoryList = async (input) => {
    const response = await adminAxios.get(`/category`, { params: input });
    return response.data;
};
/**
 * Delete category by ID
 * @param _id - category ID
 */
export const deleteCategoryData = async (_id) => {
    const response = await adminAxios.patch(`/category/${_id}`);
    return response.data;
};
/**
 * Update an existing category
 * @param input - category data with _id
 */
export const putCategory = async (input) => {
    const { _id, category_name, description } = input;
    const response = await adminAxios.put(`/category/${_id}`, {
        category_name,
        description,
    });
    return response.data;
};
