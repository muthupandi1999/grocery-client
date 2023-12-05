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
import { updateProductData } from "@/app/redux/slices/AllProductSlice";
import { useDispatch, useSelector } from "react-redux";

export const AddButton = ({
  quantity,
  onClick,
  variables,
  disable,
  subListId,
  selectedSortOption,
}) => {
  const [deleteUpdateData, setDeleteUpdateData] = useState([]);
  console.log("variables5662", variables);

  const [quantityIng, setQuantity] = useState(quantity);

  const dispatch = useDispatch();

  const { getUserCartRefetch } = fetchCartItems("655379d96144626a275e8a14");

  const [updateCartProduct, { loading: updateLoader }] =
    useMutation(updateAddToCart);

  const { loading } = useQuery(getAllCategories);

  let allProducts = useSelector((state) => state.AllProducts);

  const updateCartProd = async (quantity) => {
    const updateCartProductData = await updateCartProduct({
      variables: {
        input: {
          productId: variables?.product?.id || variables?.productId,
          quantity: quantity,
          userId: "655379d96144626a275e8a14",
          variantId: variables?.selectedVariantId,
        },
      },
      onCompleted: getUserCartRefetch,
    });

    // console.log("uopdateDPero", updateCartProductData);

    if (
      updateCartProductData &&
      updateCartProductData?.data?.updateAddToCart === null
    ) {
      const updatedProducts = allProducts?.AllProducts.map((e) => {
        if (e.id === (variables?.product?.id || variables?.productId)) {
          // console.log("Eeee", e);
          // Modify the addToCart field to null for the matched product
          return {
            ...e,
            variant: [
              {
                ...e.variant[0],
                AddToCart: null, // Set the addToCart field to null
              },
            ],
          };
        }
        return e; // Return other products unchanged
      });

      dispatch(updateProductData(updatedProducts));
      // console.log("allp", updatedProducts);

      // Use updatedProducts as needed, e.g., update state, return, etc.
      // console.log(updatedProducts); // Log the updated array
    }
  };

  if (loading || updateLoader) {
    <h4>Loading.....</h4>;
  }
  return (
    <CustomAddButton
      disabled={disable || updateLoader}
      $count={quantity}
      // onClick={}
      onClick={() => {
        if (quantity === undefined) {
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
              // console.log("heyyyyyyyy");
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
