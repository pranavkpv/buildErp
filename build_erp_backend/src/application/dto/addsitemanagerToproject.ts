export interface FetchsitemanagerInListDTO {
   _id: string,
   username: string
}

export interface listAddsiteDTO {
   _id: string;
   project_name: string;
   sitemanagerDetails: {
      _id: string;
      username: string;
      email: string;
   }[]
}