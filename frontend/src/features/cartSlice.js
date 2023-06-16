import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    amount: 0,
    total: 0,
  },
  reducers: {
    setCart: (state, action) => {
      const itemIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItem[itemIndex].cartAmount += 1;
      } else {
        const tempProduct = { ...action.payload, cartAmount: 1 };
        if (state.cartItem.length < 2) {
          state.cartItem.push(tempProduct);
          toast.success(`${action.payload.name} added succesfully`, {
            position: "bottom-left",
          });
        } else {
          toast.info(
            " Only two diferent items allowed at a time, leave some for the rest of us 🙂",
            {
              position: "bottom-left",
            }
          );
        }
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    removeCartItem: (state, action) => {
      const itemRemove = state.cartItem.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItem = itemRemove;
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      toast.error(`${action.payload.name} removed succesfully`, {
        position: "bottom-left",
      });
    },
    decreaseAmount: (state, action) => {
      const itemIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItem[itemIndex].cartAmount > 1) {
        state.cartItem[itemIndex].cartAmount -= 1;
      } else if (state.cartItem[itemIndex].cartAmount === 1) {
        const itemRemove = state.cartItem.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItem = itemRemove;
        toast.error(`${action.payload.name} removed succesfully`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    // logoutCartClear: (state, action) => {
    //   state.cartItem = [];
    //   toast.error("test", {
    //     position: "bottom-left",
    //   });
    // },
    clearCart: (state, action) => {
      state.cartItem = [];
      // toast.error("Cart cleared", {
      //   position: "bottom-left",
      // });
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    getTotal: (state, action) => {
      let { totalCart, totalAmount } = state.cartItem.reduce(
        (cartTotal, item) => {
          const { price, cartAmount } = item;
          const itemTotal = price * cartAmount;

          cartTotal.totalCart += itemTotal;
          cartTotal.totalAmount += cartAmount;
          return cartTotal;
        },
        {
          totalCart: 0,
          totalAmount: 0,
        }
      );
      state.total = totalCart;
      state.amount = totalAmount;
    },
  },
  extraReducers: {},
});
export const {
  setCart,
  removeCartItem,
  decreaseAmount,
  clearCart,
  getTotal,
  logoutCartClear,
} = cartSlice.actions;
export default cartSlice.reducer;
