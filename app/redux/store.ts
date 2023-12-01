// // redux/store.js
// import { createStore, combineReducers } from 'redux';

// import cartReducer from '../redux/reducers/cartReducer';

// const rootReducer = combineReducers({
//   cart: cartReducer,
//   // Other reducers
// });

// const store = createStore(rootReducer);

// console.log("Storeee", store)

// export default store;

// import { combineReducers } from "@reduxjs/toolkit";
// import cartSliceList from "../redux/slices/cartSlice"; // Import your slice/reducer

// const rootReducer = combineReducers({
//   cartSliceList, // Add your reducer here
//   // Add other reducers if needed
// });

// export default rootReducer;

// import { configureStore } from "@reduxjs/toolkit";
// import cartSliceReducer from "./slices/cartSlice"; // Import your combined reducers

// export const store = configureStore({
//   reducer: {
//     cartData: cartSliceReducer,
//   },
//   // Add middleware or enhancers if needed
// });


import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; // Import your cart slice here
import CategorycartReducer from './slices/categorySlice';

const store = configureStore({
  reducer: {
    cartData: cartReducer,
    category:CategorycartReducer
    // ... other reducers if any
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;