export enum MaterialSuccessMessage {
   ADD = "Material added successfully",
   DELETE = "Material deleted successfully",
   ADDFETCH = "Add material datas fetch successfully",
   FETCH = "Material fetch successfully",
    FETCH_BRAND_BY_MATERIAL_NAME = "Fetch Brands by material name is successfully",
    UNIQUE_MATERIAL_FETCH = "Unique material fetch successfully",
    FETCHUNITRATE = "fetch Unit Rate Successfully",
    FETCH_LABOUR_SUM = "fetch Labour sum successfully",
    FETCH_MATERIAL_SUM = "fetch Material Sum successfully",
     EDITFETCH = "Edit material datas fetch successfully",
     UPDATE = "Material updated successfully",
}

export enum MaterialFailedMessage {
   EXIST = "Material Already Exist",
   STOCK_MATCH = "Should be match stock and projectwise stock",
   USED_SPEC = "Material is already used Specification"
}