export interface commonOutput<T = undefined> {
   success: boolean;
   message: string;
   status_code: number;
   data?: T;
}
