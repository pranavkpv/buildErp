export enum StageSuccessMessage {
   FETCH = "Stage Data Fetch successFully",
   STATUS_CHANGE = "Stage Status Changed Successfully",
   UPLOAD_IMAGE = "Stage Images Uploaded SuccessFully",
   DELETE = "Stage Deleted SuccessFully",
   FETCH_COST = "fetch Cost successFully",
   ADD = "Stage Added SuccessFully",
   UPDATE = "Stage Updated SuccessFully"
}

export enum StageFailedMessage {
   NOT_SET = "Stage Not Set for this Project",
   ALREADY_USED = "Stage is already used",
   NOT_ESTIMATE = "This Project has not Estimate",
   ALREADY_SET = "Stage Of this Project is already set",
   NO_IMAGE = "Image Upload Not Work"
}