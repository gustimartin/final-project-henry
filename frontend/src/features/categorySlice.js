import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    allCategories: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.allCategories = action.payload;
    },
  },
  extraReducers: {},
});
export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;

export const getAllCategories = () => async (dispatch) => {
  try {
    const response = await axios.get("/category");
    dispatch(setCategories(response.data));
    // console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
};
