import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const ordesSlice = createSlice({
  name: "ordes",
  initialState: {
    allOrdes: [],
  },
  reducers: {
    setOrder: (state, action) => {
      state.allOrdes = action.payload;
    },
  },
  extraReducers: {},
});
export const { setOrder } = ordesSlice.actions;
export default ordesSlice.reducer;

export const getAllOrdes = () => async (dispatch) => {
  try {
    const response = await axios.get("/ordes");
    dispatch(setOrder(response.data));
    // console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
};