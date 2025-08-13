export enum unitSuccessMessage {
   FETCH = "Unit fetch successfully",
   DELETE = "Unit deleted successfully",
    ADD = "Unit added successfully",
      UPDATE = "Unit updated successfully",
}

export enum unitFailedMessage {
   NOT_EXIST = "Unit Not Exist",
   USED = "Unit has already been used",
   FAILED_DELETE = "Failed to Delete Unit",
   EXIST = "Unit already exists",
   FAILED_SAVE = "Unit Save failed",
   FAILED_UPDATE = "Unit Update failed",
   MISS_UNIT_ID = "Unit ID is Missing",
   REQUIRED_UNIT_NAME = "Unit name is required",
   SHORT_NAME_STRING = "Short name should be a string"
}