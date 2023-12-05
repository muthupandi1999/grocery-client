import { useSelector } from "react-redux";

export const updateReduxData = (updateId: string, updateQuantity: number, AllProducts:any) => {
  const updatedProductList = AllProducts.map((product: any) => {
    if (product.id === updateId) {
      return {
        ...product,
        variant: [
          {
            ...product.variant[0],
            AddToCart: {
              ...product.variant[0].AddToCart,
              quantity: updateQuantity,
            },
          },
        ],
      };
    }
    return product;
  });

  return updatedProductList;
};

export const addReduxData = (addSubscriptionData: any, AllProducts:any) => {
    console.log("addSubscriptionData", addSubscriptionData)
  const updatedProductList = AllProducts.map((product: any) => {
    if (product.id === addSubscriptionData?.productId) {
      //   console.log("AdssData", addSubscriptionData.addCart);
      return {
        ...product,
        variant: [
          {
            ...product.variant[0],
            AddToCart: {
              id: addSubscriptionData?.id,
              productId: addSubscriptionData?.productId,
              quantity: addSubscriptionData?.quantity,
              __typename: "AddToCart",
            },
          },
        ],
      };
    }
    return product;
  });

  return updatedProductList;
};
