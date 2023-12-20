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

const initialState = {
  AllProducts: [],
};

// const AllProductsSlice = createSlice({
//   name: "AllProducts",
//   initialState,
//   reducers: {
//     updateProductData(state: any, action: PayloadAction<any>) {
//       console.log("PayloadAction", action)
//       console.log("state", state.AllProducts)
//       state.AllProducts = action.payload; // Push the payload (single product) into the array
//     },
//     // You can add more reducers as needed
//   },
// });

// const AllProductsSlice = createSlice({
//   name: "AllProducts",
//   initialState,
//   reducers: {
//     updateProductData(state: any, action: PayloadAction<any>) {
//       console.log("PayloadAction", action);
//       console.log("state", state.AllProducts);
//       state.AllProducts = action.payload; // Push the payload (single product) into the array
//     },

//     updateProductData2(state: any, action: PayloadAction<any>) {
//       const { productId, quantity } = action.payload;

//       // Find the index of the product with the matching productId
//       const productIndex = state.AllProducts.findIndex(
//         (product: any) => product.id === productId
//       );

//       if (productIndex !== -1) {
//         // Update the quantity of the specified variant
//         state.AllProducts[productIndex].variant[0].AddToCart.quantity =
//           quantity;
//       }
//       // }
//     },
//     // You can add more reducers as needed
//   },
// });

const AllProductsSlice = createSlice({
  name: "AllProducts",
  initialState,
  reducers: {
    updateProductData(state: any, action: PayloadAction<any>) {
      state.AllProducts = action.payload; // Replace the entire array with the updated payload
    },

    updateProductData2(state: any, action: PayloadAction<any>) {
      const { productId, quantity, variantId } = action.payload;

      // Find the index of the product with the matching productId
      const productIndex = state.AllProducts.findIndex(
        (product: any) => product.id === productId
      );

      const variantIndex = state.AllProducts[productIndex]?.variant?.findIndex(
        (variant: any) => variant.id === variantId
      );


      if (productIndex !== -1) {
        // Create a new object for the updated product with an updated quantity

        const updatedVariants = state.AllProducts[productIndex].variant.map(
          (variant: any) => {
            if (variant.id === variantId) {
              const updatedAddToCart = variant?.AddToCart?.map((cartItem: any) => {
                if (cartItem.isOrder === false) {
                  // Modify the object where isOrder is false
                  return {
                    ...cartItem,
                    quantity: quantity, // Modify the quantity or any other fields
                  };
                }
                return cartItem; // Keep other objects unchanged
              });
        
              return {
                ...variant,
                AddToCart: updatedAddToCart,
                // Other properties you want to update for this variant
              };
            }
            return variant; // Keep other variants unchanged
          }
        )

        const updatedProduct = {
          ...state.AllProducts[productIndex],
          variant: updatedVariants,
        };
        // const updatedProduct = {
        //   ...state.AllProducts[productIndex],
        //   variant: [
        //     ...state.AllProducts[productIndex].variant,
        //     {
        //       ...state.AllProducts[productIndex].variant[variantIndex],
        //       AddToCart: {
        //         ...state.AllProducts[productIndex].variant[variantIndex].AddToCart,
        //         quantity: quantity,
        //       },
        //     },
        //   ],
        // };

        // Create a new state array with the updated product
        state.AllProducts = [
          ...state.AllProducts.slice(0, productIndex),
          updatedProduct,
          ...state.AllProducts.slice(productIndex + 1),
        ];

      }
    },

    addProductData(state: any, action: PayloadAction<any>) {
      const { addProduct, variantId } = action.payload;
 

      // Find the index of the product with the matching productId
      const productIndex = state.AllProducts.findIndex(
        (product: any) => product.id === addProduct?.productId
      );

      if (productIndex !== -1) {
        const updatedVariants = state.AllProducts[productIndex].variant.map(
          (variant: any) => {
            if (variant.id === addProduct?.selectedVariantId) {
              const existingItem = variant?.AddToCart?.find(
                (item: any) => item.id === addProduct?.id
              );

              // Check if the item already exists in AddToCart
              if (!existingItem) {
                const updatedAddToCart = [
                  ...(variant.AddToCart || []),
                  {
                    id: addProduct?.id,
                    product: addProduct?.product,
                    selectedVariant: addProduct?.selectedVariant,
                    quantity: addProduct?.quantity || 1,
                    isOrder: addProduct?.isOrder,
                  },
                ];

                return {
                  ...variant,
                  AddToCart: updatedAddToCart,
                  // Other properties you want to update for this variant
                };
              }
            }
            return variant; // Keep other variants unchanged
          }
        );

        const updatedProduct = {
          ...state.AllProducts[productIndex],
          variant: updatedVariants,
        };

        // Update the state with the updated product
        state.AllProducts = [
          ...state.AllProducts.slice(0, productIndex),
          updatedProduct,
          ...state.AllProducts.slice(productIndex + 1),
        ];
      }
    },
    // Other reducers...
  },
});

export const { updateProductData, updateProductData2, addProductData } =
  AllProductsSlice.actions;
const AllProductsReducer = AllProductsSlice.reducer;
export default AllProductsReducer;
