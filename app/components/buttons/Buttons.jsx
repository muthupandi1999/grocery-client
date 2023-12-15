"use client";
import React, { useContext, useState, useEffect } from "react";
import { CustomAddButton } from "../../assets/style";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import {
  getProductVariant,
  updateAddToCart,
  updateSubs,
} from "@/app/service/query";
import { globalContext } from "@/app/utils/states";
import { getAllCategories, AddToCart } from "../../service/query";
import DeleteIcon from "@mui/icons-material/Delete";
import debounce from "lodash/debounce";
import { GetAddToCartsApi, FetchCartItems } from "@/app/service/api";
import {
  FetchCategoryWithProducts,
  ProductTypeProductsByCategoryId,
} from "@/app/service/api";
import {
  updateProductData,
  updateProductData2,
} from "@/app/redux/slices/AllProductSlice";
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
  console.log("variables5662QUnr", quantity);

  const [quantityIng, setQuantity] = useState(quantity);

  const dispatch = useDispatch();

  const { getUserCartRefetch } = FetchCartItems("655379d96144626a275e8a14");

  const [updateCartProduct, { loading: updateLoader }] =
    useMutation(updateAddToCart);

  const { loading } = useQuery(getAllCategories);

  let allProducts = useSelector((state) => state.AllProducts);
  const { data: updateSubscriptionData } = useSubscription(updateSubs);
  useEffect(() => {
    if (updateSubscriptionData !== undefined) {
      console.log("updateSubscriptionData", updateSubscriptionData);
      let { productId, quantity, selectedVariantId } =
        updateSubscriptionData?.updateCart;

      dispatch(
        updateProductData2({
          productId: productId,
          quantity: quantity,
          variantId: selectedVariantId,
        })
      );
    }
  }, [updateSubscriptionData]);

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
      updateCartProductData?.data?.updateAddToCart?.quantity === 0
    ) {
      const updatedProducts = allProducts?.AllProducts.map((e) => {
        if (e.id === (variables?.product?.id || variables?.productId)) {
          const updatedVariants = e?.variant.map((variant) => {
            if (variant.id === variables?.selectedVariantId) {
              return {
                ...variant,
                AddToCart: null, // Set AddToCart to null for the matched variant
                // Other properties you want to update for this variant
              };
            }
            return variant; // Keep other variants unchanged
          });

          // Return the modified product with updated variants
          return {
            ...e,
            variant: updatedVariants,
          };
        }
        return e; // Return other products unchanged
      });

      dispatch(updateProductData(updatedProducts));
      // Use updatedProducts as needed
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
