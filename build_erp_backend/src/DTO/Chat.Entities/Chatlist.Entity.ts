export interface chatListData {
  _id: string
  project_name: string
  sitemanager_id: string
  sitemanager_name: string
  sitemanager_image?: string
  user_id: string
  username: string
}

export interface messageData {
  id?: string;
  message?: string;
  senderId: string;
  receiverId: string
  createdAt?: Date;
}

export interface chatListUserData {
  _id: string;
  project_name: string;
  user_id: string;
  username: string;
  user_image?: string;
}

export interface chatListOutput {
  success: boolean,
  message: string,
  data: chatListData[] | messageData[] | chatListUserData[]
  status_code: number
}