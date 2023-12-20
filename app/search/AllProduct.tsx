"use client";
import React, { useEffect, useState } from "react";
import {
  AddToCartRed,
  AllProductsWithSearch,
  updateSubs,
} from "@/app/service/query";

import ProductCard from "@/app/components/cards/ProductCard";

import { useLazyQuery, useSubscription } from "@apollo/client";
import {
  CategoryContentContainer,
  CategoryGridContainer,
  NofoundText,
} from "../assets/style";
import { useDispatch } from "react-redux";
import {
  addProductData,
  updateProductData2,
} from "../redux/slices/AllProductSlice";

function AllProduct() {
  const [allProducts, setAllProducts] = useState([]) as any;

  const dispatch = useDispatch();

  const [loadGreeting, { loading: AllProductsLoading }] = useLazyQuery(
    AllProductsWithSearch,
    {
      variables: {
        filter: "",
      },
    }
  );

  const { data: updateSubscriptionData } = useSubscription(updateSubs);
  const { data: addSubscriptionData } = useSubscription(AddToCartRed);

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

  useEffect(() => {
    if (addSubscriptionData != undefined) {
      dispatch(
        addProductData({
          addProduct: addSubscriptionData.addCart,
          variantId: addSubscriptionData?.selectedVariantId,
        })
      );
    }
  }, [addSubscriptionData]);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await loadGreeting();
      setAllProducts(data?.getAllProducts);
    };
    getAllProducts();
  }, [loadGreeting]);

  // if (AllProductsLoading) return <PageLoader />;
  return (
    <div>
      {allProducts ? (
        <CategoryContentContainer>
          <div className="content-header">
            <h1> All Products </h1>
          </div>

          <CategoryGridContainer>
            {allProducts?.map((data: any) => (
              <ProductCard
                width="100%"
                key={data.id}
                data={data}
                categoryId={""}
              />
            ))}
          </CategoryGridContainer>
        </CategoryContentContainer>
      ) : (
        <NofoundText> No data found</NofoundText>
      )}
    </div>
  );
}

export default AllProduct;
