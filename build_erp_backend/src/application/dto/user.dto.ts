export interface userLoginDTO {
   _id: string
   email: string
   username: string
   phone?: number
   profile_image?: string
}

export interface chatListDTO {
   _id: string;
   project_name: string;
   user_id: string;
   username: string;
   user_image?: string;

}

interface Project {
  id: string;
  name: string;
  completion: number; 
  pendingPayment: number; 
}

export interface dashBoardDTO {
   projectsCount: number;
   walletBalance: number;
   projects: Project[];
}
