import { createSlice } from '@reduxjs/toolkit';

const userIdSlice = createSlice({
  name: 'idUser',
  initialState: {
    user: ''
  },
  reducers: {
    setId: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setId } = userIdSlice.actions;
export default userIdSlice.reducer;