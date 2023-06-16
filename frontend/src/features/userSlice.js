
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    role: '',
    filteredUsers: []
   
  },
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
    },

    setFilteredUsers: (state, action) => {

      state.filteredUsers = action.payload;

    },

    
  },
});

export const { 
  setUserRole,
  setFilteredUsers,
 
} = userSlice.actions;

export default userSlice.reducer;
