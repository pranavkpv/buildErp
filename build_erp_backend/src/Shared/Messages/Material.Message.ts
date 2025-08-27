export const MaterialSuccessMessage = {
  ADD: "Material added successfully",
  DELETE: "Material deleted successfully",
  ADDFETCH: "Add material datas fetch successfully",
  FETCH: "Material fetch successfully",
  FETCH_BRAND_BY_MATERIAL_NAME: "Fetch Brands by material name is successfully",
  UNIQUE_MATERIAL_FETCH: "Unique material fetch successfully",
  FETCHUNITRATE: "fetch Unit Rate Successfully",
  FETCH_LABOUR_SUM: "fetch Labour sum successfully",
  FETCH_MATERIAL_SUM: "fetch Material Sum successfully",
  EDITFETCH: "Edit material datas fetch successfully",
  UPDATE: "Material updated successfully",
};

export const MaterialFailedMessage = {
  EXIST: "Material Already Exist",
  STOCK_MATCH: "Should be match stock and projectwise stock",
  USED_SPEC: "Material is already used Specification",
  REQUIRED_FIELD: "material_name, category_id, unit_id, unit_rate and stock are required",
  MATERIAL_CHAR: "material_name must be a non-empty string",
  MAX_MATERIAL_NAME: "material_name should not exceed 100 characters",
  UNIT_RATE_VALID: "unit_rate must be a valid number",
  UNIT_RATE_GREATER: "unit_rate must be greater than 0",
  UNIT_RATE_HIGH: "unit_rate too high, must be less than 1,000,000",
  STOCK_VALID: "stock must be a valid number",
  STOCK_NEGATIVE: "stock cannot be negative",
  PROJECT_WISE_STOCK_MUST: "projectWiseStock must be an array",
  PROJECT_CHAR: "project must be a valid string or number",
};
