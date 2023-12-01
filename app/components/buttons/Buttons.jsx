"use client";
import React, { useContext, useState, useEffect } from "react";
import { CustomAddButton } from "../../assets/style";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { useQuery, useMutation } from "@apollo/client";
import { getProductVariant, updateAddToCart } from "@/app/service/query";
import { globalContext } from "@/app/utils/states";
import { getAllCategories, AddToCart } from "../../service/query";
import DeleteIcon from "@mui/icons-material/Delete";
import debounce from "lodash/debounce";
import { GetAddToCartsApi, fetchCartItems } from "@/app/service/api";
import {
  fetchCategoryWithProducts,
  productTypeProductsByCategoryId,
} from "@/app/service/api";

export const AddButton = ({
  quantity,
  onClick,
  variables,
  disable,
  categoryId,
  subListId,
  selectedSortOption,
}) => {
  console.log("variables234", variables);
  console.log("quantity4567", quantity);
  console.log("categoryIdddddddd", categoryId);

  // const {CategoryListArr} = useContext(globalContext)
  const [quantityIng, setQuantity] = useState(quantity);

  // useEffect(() => {
  //   if(count > 1){
  //     setCount(quantity);
  //   }
    
  // }, [count]);

  // console.log("couttintttd", count);

  // const { AddToCartsRefetch } = GetAddToCartsApi("655379d96144626a275e8a14");

  // const { CategoryProductsRefetch } = fetchCategoryWithProducts(categoryId);

  const { refetchProducts } = productTypeProductsByCategoryId(
    subListId,
    selectedSortOption
  );

  const { getUserCartRefetch } = fetchCartItems("65642fcb264c4f37a0b129be");

  console.log("coiuntttttt", quantity);
  const [
    updateCartProduct,
    { data: updateCart, error, loading: updateLoader },
  ] = useMutation(updateAddToCart);

  const { data: AllData, loading } = useQuery(getAllCategories);

  // const {

  //   CategoryProductsRefetch,

  // } = fetchCategoryWithProducts();
  // useEffect(() => {
  //   loadGreeting({
  //     variables: {
  //       getCategoryWithProductTypesId: id,
  //     },
  //   });
  //   setSliderData(CategoryProductsSlider?.getCategoryWithProductTypes);
  // }, [CategoryProductsSlider]);

  // const { getUserCartRefetch } = fetchCartItems("65642fcb264c4f37a0b129be");

  // const updateCartProd = async (quantity) => {
  //   const updateCartProductData = await updateCartProduct({
  //     variables: {
  //       input: {
  //         productId: variables?.product?.id || variables?.productId,
  //         quantity: quantity,
  //         userId: "655379d96144626a275e8a14",
  //         variantId: variables?.selectedVariantId,
  //       },
  //     },
  //   });

  //   console.log("updateCart", updateCart);
  // };

  const updateCartProd = async (quantity) => {
    const updateCartProductData = await updateCartProduct({
      variables: {
        input: {
          productId: variables?.product?.id || variables?.productId,
          quantity: quantity,
          userId: "65642fcb264c4f37a0b129be",
          variantId: variables?.selectedVariantId,
        },
      },
      // onCompleted:getUserCartRefetch
    });

    console.log("updateCart", updateCartProductData);
    // if (updateCartProductData) {
    //   // getUserCartRefetch();
    //   if (categoryId) {
    //     CategoryProductsRefetch();
    //   } else if (subListId) {
    //     refetchProducts({
    //       getProductTypeId: subListId,
    //       filter: selectedSortOption,
    //     });
    //   }

    //   // AddToCartsRefetch();
    // }
  };

  // Debounce with a 1-second delay

  console.log("onclickk", onClick);

  // const addToCart = async () => {
  //   // console.log("CategoryListArr", CategoryListArr);
  //   console.log("clicking");

  //   const addToCartData = await addToCartProduct({
  //     variables: {
  //       input: variables,
  //     },
  //   });

  //   if (addToCartData) {
  //     refetchFun();
  //   }

  //   console.log("dataaaaaa", AddToCartData);
  // };

  // const addToCart = async () => {
  //   // console.log("CategoryListArr", CategoryListArr);
  //   console.log("clicking");

  //   const addToCartData = await addToCartProduct({
  //     variables: {
  //       input: variables,
  //     },
  //   });

  //   if (addToCartData) {

  //     refetchFun();

  //   }
  if (loading || updateLoader) {
    <h4>Loading.....</h4>;
  }
  return (
    <CustomAddButton
      disabled={disable || updateLoader}
      $count={quantity}
      // onClick={}
      onClick={() => {
        if (quantity ===  undefined) {
          setQuantity((prev) => prev + 1);
          onClick();
          // onClick();
        }
      }}
    >
      {quantity == undefined ? (
        <span>ADD</span>
      ) : (
        <>
          <span
            onClick={() => {
              updateCartProd(-1);
              setQuantity((prev) => prev - 1);
            }}
          >
            {quantity === 1 && (
              <DeleteIcon
                sx={{ fontSize: "14px", marginTop: "2px" }}
                color="white"
              />
            )}
            {quantity > 1 && <HiMinusSm color="white" />}
          </span>
          {quantity}
          <span
            onClick={() => {
              console.log("heyyyyyyyy");
              updateCartProd(+1);
              setQuantity((prev) => prev + 1);
              // console.log("coutntinnfffff", count);
              // updateCartProd(+1);
            }}
          >
            <HiPlusSm color="white" />
          </span>
        </>
      )}
    </CustomAddButton>
  );
};
