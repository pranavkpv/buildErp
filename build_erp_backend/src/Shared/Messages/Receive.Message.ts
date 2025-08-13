export enum ReceiveSuccessMessage {
   APPROVE = "Receive Approved successfully",
   DELETE = "Receive Deleted successfully",
   FETCH = "ReceiveData Fetched successfully",
   SAVE = "Receive Data saved Successfully",
   UPDATE = "Receive Data Updated Successfully"
}

export enum ReceiveFailedMessage {
   FETCH  = "Failed to fetch Receive Data",
   DELETE = "An Error occured when delete Receive Data",
   GREATER_DATE = "Receive Date Must be Greater Than Transfer Date",
   SAVE ="Failed to Save Receive Data",
   UPDATE = "Failed to Update Receive Data"
}