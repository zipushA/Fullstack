// // src/redux/slices/authSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { User } from '../../../models/UserType';


// interface AuthState {
//   user: User | null;
//   token: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<{ user: User; token: string }>) {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//     logout(state) {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;
// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../models/UserType';

interface AuthState {
  user: User | null;
  token: string | null;
  userType: 'teacher' | 'manager' | null;  // הוספנו את השדה הזה
}

const initialState: AuthState = {
  user: null,
  token: null,
  userType: null,  // בהתחלה הוא יהיה null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUserType(state, action: PayloadAction<'teacher' | 'manager'>) {
      state.userType = action.payload;  // מעדכנים את סוג המשתמש
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.userType = null;  // מוחקים את סוג המשתמש בהתנתקות
    },
  },
});

export const { setUser, setUserType, logout } = authSlice.actions;
export default authSlice.reducer;
