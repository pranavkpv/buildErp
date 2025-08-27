export enum CategorySuccessMessage {
   ADD = "Category Added Successfully",
   FETCH = "Category Data fetch successfully",
   UPDATE = "Category updated successfully",
   DELETE = "Category deleted successfully",
}


export enum CategoryFailedMessage {
   NEED_CATEGORY = "Category name is required and must be a non-empty string.",
   EXIST_CATEGORY = "Category Already Exists",
   EXIST_SPECIAL_CHAR = "Category name contains invalid characters. Allowed: letters, numbers, spaces, -, _, &.",
   EXIST_NUMBER = "Category Name Should Not Exist Number",
   MIN_SIZE = "Category Name Should Atleast 3 Character",
   MAX_SIZE = "Category Name Shoulnot be Longer",
   FAILED_SAVE = "Failed To Save The Category",
   FAILED_UPDATE = "Failed To Update The Category",
   MISS_CATEGORY_ID = "Category ID is required",
   CATEGORY_NOT_EXIST = "Category Not Exist",
   ALREADY_USED = "Category has already been used",
   FAILED_DELETE = "Failed To Delete The Category",
   CATEGORY_LENGTH = "Category name must be between 2 and 50 characters.",
   DESCRIPTION_CHAR =  "Description must be a string if provided.",
   DESCRIPTION_LENGTH = "Description must not exceed 200 characters."
}