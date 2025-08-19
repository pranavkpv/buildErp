export interface userBaseChatoutput {
   _id: string;
   project_name: string;
   sitemanager_id: string;
   sitemanager_name: string;
   sitemanager_image?: string;
   user_id: string;
   username: string
}

export interface fetchprojectInput {
   status: string
   search: string
   area: number
   page: number
}