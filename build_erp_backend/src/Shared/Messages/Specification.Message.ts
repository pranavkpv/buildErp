export enum SpecSuccessMessage {
   DELETE = "Specification Deleted SuccessFully",
   FETCH = "Specification Fetched SuccessFully",
   ADD = "Specifiaction Addedd Successfully",
   UNIT_RATE_FETCH = "Specification Unit Rate Fetch Successfully",
   UPDATE = "Specifiaction Updated Successfully"
}

export enum SpecFailedMessage {
   SPEC_ID_REQUIRED = "specId is required and must be a non-empty string",
    SPEC_ID_FORMAT= "Specification ID must be a valid 24-character MongoDB ObjectId",
    SPEC_NAME_MIN = "Specification name is required and must be at least 3 characters long",
   USED_ESTIMATION = "Specification is already used Estimation",
   EXIST_NAME = "Specification Name is already exist",
   EXIST_ID = "Spec Id is already exist",
   SPEC_ID_MISS = "Should add atleast one specification",
   SPEC_ID_CHAR = "spec_id must be a non-empty string",
   SPEC_NAME_CHAR = "spec_name must be a non-empty string",
   UNIT_POSITIVE = "unitrate must be a positive number",
   QUANTITY_POSITIVE = "quantity must be a positive number",
   TOTAL_POSITIVE = "total must be a positive number",
   TOTAL_VALUE = `total must equal unitrate * quantity.`,
   IMAGE_REQUIRED = "Image file is required",
   ONLY_ONE = "Only one image is allowed",
   INVALID_FILE = "Invalid file type. Only JPEG, PNG, and WEBP are allowed.",
   INVALID_FILE_SIZE = "File too large. Max 5MB allowed.",
   SPEC_UNIT_REQUIRED = "Specification unit is required and must be a string",
   SPEC_DESCRIPTION_FORMAT = "Specification description must be a valid string",
   MATERIAL_REQUIRED = "Material details are required and must be a non-empty array",
   MATERIAL_ID_FORMAT =  "must be a valid string",
   MATERIAL_QTY_POSITIVE = "must be a positive number greater than 0",
   MATERIAL_RATE_POSITIVE = "must be a non-negative number",
   LABOUR_REQUIRED = "Labour details are required and must be a non-empty array",
   LABOUR_ID_FORMAT = "must be a valid string",
   LABOUR_HOURS_POSITIVE = "must be a positive number greater than 0",
   LABOUR_RATE_POSITIVE = "must be a non-negative number",
   ADDITIONAL_EXPENSE_RANGE = "Additional expense percentage must be a number between 0 and 100",
   PROFIT_RANGE =  "Profit percentage must be a number between 0 and 100"
}