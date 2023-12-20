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
import CircularProgress from "@mui/material/CircularProgress";

export const AddButton = ({
  quantity,
  onClick,
  variables,
  disable,
  subListId,
  selectedSortOption,
}) => {
  const [quantityIng, setQuantityIng] = useState(null);

  useEffect(() => {
    if (quantity) {
      setQuantityIng(quantity);
    }
  }, [quantity]);

  const [showQuantity, setShowQuantity] = useState(false);

  const [first, setFirst] = useState(false);

  const [clicking, setClicking] = useState(false);

  const [firstTime, setFirstTime] = useState(true);

  const handleClick = () => {
    setClicking(true);
    setFirst(true);
  };

  useEffect(() => {
    let timer;

    if (!clicking) {
      // Function to trigger when clicking stops

      if (first) {
        updateCartProd(quantityIng);
      }
    } else {
      timer = setTimeout(() => {
        setClicking(false);
      }, 250); // Adjust the delay to consider the duration of continuous clicks
    }

    return () => {
      clearTimeout(timer);
    };
  }, [clicking, quantityIng]);

  const dispatch = useDispatch();

  const { getUserCartRefetch } = FetchCartItems("65642fcb264c4f37a0b129be");

  const [updateCartProduct, { loading: updateLoader }] =
    useMutation(updateAddToCart);

  const { loading } = useQuery(getAllCategories);

  let allProducts = useSelector((state) => state.AllProducts);
  const { data: updateSubscriptionData } = useSubscription(updateSubs);
  useEffect(() => {
    if (updateSubscriptionData !== undefined) {
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
          userId: "65642fcb264c4f37a0b129be",
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
                AddToCart: [], // Set AddToCart to null for the matched variant
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
  console.log("quantity", quantity);
  return (
    <CustomAddButton
      disabled={disable || updateLoader}
      $count={quantity}
      // onClick={}
      onClick={(e) => {
        e.stopPropagation();
        if (quantity === undefined) {
          setQuantityIng((prev) => prev + 1);
          onClick();
          // onClick();
        }
      }}
    >
      {quantity == undefined || quantityIng === 0 ? (
        <span>ADD</span>
      ) : (
        <>
          {updateLoader ? (
            <CircularProgress
              size={"20px"}
              sx={{
                color: "#fff",
              }}
            />
          ) : (
            <>
              <span
                onMouseDown={handleClick}
                onClick={() => {
                  // updateCartProd(-1);
                  setQuantityIng((prev) => prev - 1);
                  setShowQuantity(true);
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
              {showQuantity ? quantityIng : quantity}
              <span
                onMouseDown={handleClick}
                onClick={() => {
                  // updateCartProd(+1);
                  setQuantityIng((prev) => prev + 1);
                  setShowQuantity(true);
                  // console.log("coutntinnfffff", count);

                  // updateCartProd(+1);
                }}
              >
                <HiPlusSm color="white" />
              </span>
            </>
          )}
        </>
      )}
    </CustomAddButton>
  );
};
