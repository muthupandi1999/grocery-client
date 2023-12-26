import { useContext } from "react";
import { setCartItems } from "../myContext/action";
import { IDispatch, MyContext } from "../myContext";

export const updateQuantity = (dispatch: IDispatch, responseObj: any) => {
  setCartItems(dispatch, {
    id: responseObj.productId,
    quantity: responseObj.quantity,
    categoryId: responseObj.product.ProductType.productCategoryId,
    name: responseObj.product.name,
    image: responseObj.product.image.image,
    selectedvariant: responseObj.selectedVariant,
    addToCartId: responseObj?.id,
  });
};

export const updateProductsArr = (
  productsArr: {
    id: string;
    productsArr: { id: string; AddToCart: { quantity: number } }[];
  }[],
  cart: { id: string; quantity: number; selectedvariant: { id: string } }[]
) => {
  console.log("check incoming", productsArr, cart);
  if (cart.length > 0) {
    const updateProducts = productsArr?.map((prod) => {
      const correspondingCartItem = cart.filter(
        (cartItem) => cartItem.id === prod.id
      );

      if (correspondingCartItem) {
        const updatedVariants = prod.variant.map((variantItem) => {
          const getSelectedVariant = correspondingCartItem.find(
            (variant) => variant.selectedvariant.id === variantItem?.id
          );
          if (getSelectedVariant) {
            if (getSelectedVariant.quantity > 0) {
              return {
                ...variantItem,
                AddToCart:
                  variantItem.AddToCart?.length > 0
                    ? variantItem.AddToCart?.map((data) => {
                        return {
                          ...data,
                          quantity: getSelectedVariant.quantity,
                        };
                      })
                    : [
                        {
                          ...variantItem.AddToCart,
                          quantity: getSelectedVariant.quantity,
                        },
                      ],
              };
            } else {
              return {
                ...variantItem,
                AddToCart: null,
              };
            }
          } else {
            return variantItem;
          }
        });

        return {
          ...prod,
          variant: updatedVariants,
        };
      } else {
        return prod;
      }
    });

    console.log("vf", updateProducts);
    return updateProducts;
  } else {
    const emptyProductQuantity = productsArr?.map((data) => {
      return {
        ...data,
        variant: data?.variant?.map((vari) => {
          return {
            ...vari,
            AddToCart: [],
          };
        }),
      };
    });
    return emptyProductQuantity;
  }
};

export const updateProductObj = (productsObj, cartItems) => {
  console.log("12", productsObj, cartItems);
  const selectedProduct = productsObj?.product?.variant?.map((variant) => {
    const selectedVariant = cartItems.find(
      (pickVariant) => pickVariant?.selectedvariant?.id === variant?.id
    );
    console.log(selectedVariant, "find12");
    if (selectedVariant) {
      return {
        ...variant,
        AddToCart:
          variant.AddToCart.length > 0
            ? variant.AddToCart.map((data, index) => {
                if (index === 0) {
                  return { ...data, quantity: selectedVariant?.quantity };
                } else {
                  return data;
                }
              })
            : [{ quantity: selectedVariant?.quantity }],
      };
    } else {
      return variant;
    }
    // if (selectedVariant) {
    //   const updateVariant = productsObj?.product?.variant?.map((data) => {
    //     // const selectedVariant = cartItems.find(
    //     //   (value) => value?.selectedvariant?.id === data?.id
    //     // );
    //     // console.log("12id", selectedVariant);
    //     // if (selectedVariant) {
    //     if (selectedVariant?.quantity > 0) {
    //       return {
    //         ...data,
    //         AddToCart: data.AddToCart.map((data, index) => {
    //           if (index === 0) {
    //             return { ...data, quantity: selectedVariant?.quantity };
    //           } else {
    //             return data;
    //           }
    //         }),
    //       };
    //     } else {
    //       return {
    //         ...data,
    //         AddToCart: null,
    //       };
    //     }
    //     // } else {
    //     //   return data;
    //     // }
    //   });
    //   console.log("12id", updateVariant);

    //   return {
    //     ...productsObj,
    //     product: { ...productsObj.product, variant: updateVariant },
    //   };
    // } else {
    //   return variant;
    // }
  });

  console.log("sp", {
    ...productsObj,
    product: { ...productsObj.product, variant: selectedProduct },
  });
  return {
    ...productsObj,
    product: { ...productsObj.product, variant: selectedProduct },
  };
};

export const CartTotalItems = (items) => {
  return items.filter((data)=> data?.quantity>0)?.reduce((acc, obj) => {
    if (obj?.quantity > 0) {
      return acc + obj?.quantity;
    }
  }, 0);
};
export const CartTotalAmount = (items) => {
  return items?.reduce((acc, obj) => {
    return acc + obj?.quantity * obj?.selectedvariant?.price;
  }, 0);
};
export const SetCartArrFunc = (data, dispatch) => {
  data?.getAddToCartsByUserId?.carts?.map((data) => {
    console.log(data);

    setCartItems(dispatch, {
      id: data?.product?.id,
      quantity: data?.quantity,
      categoryId: data?.product?.ProductType?.productCategoryId,
      name: data?.product?.name,
      image: data?.product?.image?.image,
      selectedvariant: data.selectedVariant,
      addToCartId: data?.id,
    });
  });
};

export const setProductObj = (data) => {
  return {
    category: {
      name: data?.getProduct?.ProductType?.name,
      id: data?.getProduct?.ProductType?.productCategoryId,
    },
    subCategory: { id: data?.getProduct?.ProductType?.id },
    product: {
      id: data?.getProduct?.id,
      name: data?.getProduct?.name,
      image: data?.getProduct?.image?.image,
      imageList: data?.getProduct?.image?.imageList,
      discount: data?.getProduct?.dicountPercentage,
      variant: data?.getProduct?.variant,
    },
    productType: {
      id: data?.getProduct?.ProductType?.id,
    },
  };
};
