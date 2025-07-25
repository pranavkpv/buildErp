import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type User = {
   _id:string,
   username: string;
   email: string;
   phone: number;
   profile_image?: string;
   token: string;
};

type AuthState = {
   user: User | null;
};

const initialState: AuthState = {
   user: null,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      login(state, action: PayloadAction<User>) {
         state.user = action.payload;
      },
      logout(state) {
         state.user = null;
      }
   }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;