export interface fetchingChatInput {
   senderId:string 
   receiverId:string
}

export interface savingChatInput extends fetchingChatInput {
   message:string
   messageStatus:string
}

export interface updateMessageStatusInput extends fetchingChatInput {
    messageId:string
}