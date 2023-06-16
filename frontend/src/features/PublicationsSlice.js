
import { createSlice } from '@reduxjs/toolkit';

const publicationsSlice = createSlice({
  name: 'publication',
  initialState: {
    rating: 0,
  },
  reducers: {
    setRating: (state, action) => {
      state.rating = action.payload;
    },
  },
});

export const { setRating } = publicationsSlice.actions;

export default publicationsSlice.reducer;