// // cartSlice.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CartState {
//   products: any[]; // Define your cart structure here
//   name: string;
//   id: string;
//   // ... other cart properties
// }

// const initialState: CartState = {
//   products: [],
//   name: '',
//   id: '',
//   // ... initialize other cart properties
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     updateCartData(state:any, action: PayloadAction<any>) {
//       state.products = action.payload.products;
//       state.name = action.payload.name;
//       state.id = action.payload.id;
//       // ... update other cart properties
//     },
//   },
// });

// export const { updateCartData } = cartSlice.actions;
// const cardReducer = cartSlice.reducer
// export default cardReducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState = {};

const CategorycartSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateCartData(state: any, action: PayloadAction<Partial<any>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateCartData } = CategorycartSlice.actions;
const CategorycartReducer = CategorycartSlice.reducer;
export default CategorycartReducer;
